import db from "./db.mjs";

const TAX_RATE = 0.0779;

const STATUS_LABELS = {
  processing: "Processing",
  shipped: "Shipped",
  in_transit: "In Transit",
  delivered: "Delivered",
};

const LAST_DONE_STEP = { processing: 1, shipped: 2, in_transit: 3, delivered: 4 };

function cartOwner(req) {
  const id = req.session?.userId;
  if (id) return `user:${id}`;
  return `sess:${req.sessionID}`;
}

export function mergeGuestCartToUser(req) {
  const userId = req.session?.userId;
  if (!userId) return;
  const guest = `sess:${req.sessionID}`;
  const user = `user:${userId}`;
  const rows = db.prepare("SELECT id, product_id, qty FROM cart_items WHERE owner = ?").all(guest);
  for (const r of rows) {
    const ex = db
      .prepare("SELECT id, qty FROM cart_items WHERE owner = ? AND product_id = ?")
      .get(user, r.product_id);
    if (ex) {
      db.prepare("UPDATE cart_items SET qty = ? WHERE id = ?").run(ex.qty + r.qty, ex.id);
    } else {
      db.prepare("INSERT INTO cart_items (owner, product_id, qty) VALUES (?, ?, ?)").run(user, r.product_id, r.qty);
    }
  }
  db.prepare("DELETE FROM cart_items WHERE owner = ?").run(guest);
}

function mapCartRow(row) {
  const lineTotal = Math.round(row.price * row.qty * 100) / 100;
  return {
    id: row.id,
    productId: row.product_id,
    name: row.name,
    price: row.price,
    oldPrice: row.old_price,
    image: row.image,
    emoji: row.emoji,
    inStock: row.in_stock === 1,
    qty: row.qty,
    lineTotal,
  };
}

function formatDate(d) {
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function addDays(d, n) {
  const x = new Date(d);
  x.setDate(x.getDate() + n);
  return x;
}

function buildTrackingPayload(order) {
  const created = new Date(order.created_at);
  const orderDate = formatDate(created);
  const status = order.status || "in_transit";
  const statusLabel = STATUS_LABELS[status] || "In Transit";
  const lastDone = LAST_DONE_STEP[status] ?? 3;

  const stepLabels = ["Order Placed", "Processing", "Shipped", "In Transit", "Delivered"];
  const etaDate = addDays(created, 7);
  const eta = formatDate(etaDate);

  const steps = stepLabels.map((label, i) => {
    const done = i <= lastDone;
    const dateStr =
      i === stepLabels.length - 1 && !done ? `Est. ${eta}` : formatDate(addDays(created, i));
    return { label, done, date: dateStr };
  });

  return {
    id: order.order_number,
    email: order.email,
    status: statusLabel,
    date: orderDate,
    eta,
    steps,
  };
}

export function mountShopRoutes(app) {
  console.log("[shop] mounted: /api/products, /api/cart, /api/wishlist, /api/orders, …");

  app.get("/api/products", (_req, res) => {
    const rows = db.prepare("SELECT * FROM products ORDER BY id ASC").all();
    res.json({
      products: rows.map((p) => ({
        id: p.id,
        name: p.name,
        price: p.price,
        oldPrice: p.old_price,
        image: p.image,
        emoji: p.emoji,
        badge: p.badge,
        inStock: p.in_stock === 1,
      })),
    });
  });

  app.get("/api/cart", (req, res) => {
    const owner = cartOwner(req);
    const rows = db
      .prepare(
        `SELECT c.id, c.product_id, c.qty, p.name, p.price, p.old_price, p.image, p.emoji, p.badge, p.in_stock
         FROM cart_items c
         JOIN products p ON p.id = c.product_id
         WHERE c.owner = ?
         ORDER BY c.id ASC`
      )
      .all(owner);
    const items = rows.map((r) =>
      mapCartRow({
        id: r.id,
        product_id: r.product_id,
        qty: r.qty,
        name: r.name,
        price: r.price,
        old_price: r.old_price,
        image: r.image,
        emoji: r.emoji,
        badge: r.badge,
        in_stock: r.in_stock,
      })
    );
    const subtotal = Math.round(items.reduce((s, i) => s + i.lineTotal, 0) * 100) / 100;
    res.json({ items, subtotal });
  });

  app.post("/api/cart/items", (req, res) => {
    const productId = Number(req.body?.productId);
    const qty = Math.max(1, Math.floor(Number(req.body?.qty) || 1));
    if (!Number.isFinite(productId)) {
      return res.status(400).json({ error: "productId is required." });
    }
    const product = db.prepare("SELECT * FROM products WHERE id = ?").get(productId);
    if (!product) {
      return res.status(404).json({ error: "Product not found." });
    }
    if (product.in_stock !== 1) {
      return res.status(400).json({ error: "This product is out of stock." });
    }
    const owner = cartOwner(req);
    const existing = db
      .prepare("SELECT id, qty FROM cart_items WHERE owner = ? AND product_id = ?")
      .get(owner, productId);
    if (existing) {
      db.prepare("UPDATE cart_items SET qty = ? WHERE id = ?").run(existing.qty + qty, existing.id);
    } else {
      db.prepare("INSERT INTO cart_items (owner, product_id, qty) VALUES (?, ?, ?)").run(owner, productId, qty);
    }
    res.status(201).json({ ok: true });
  });

  app.patch("/api/cart/items/:productId", (req, res) => {
    const productId = Number(req.params.productId);
    const qty = Math.max(1, Math.floor(Number(req.body?.qty) || 1));
    if (!Number.isFinite(productId)) {
      return res.status(400).json({ error: "Invalid product." });
    }
    const owner = cartOwner(req);
    const row = db.prepare("SELECT id FROM cart_items WHERE owner = ? AND product_id = ?").get(owner, productId);
    if (!row) {
      return res.status(404).json({ error: "Cart line not found." });
    }
    db.prepare("UPDATE cart_items SET qty = ? WHERE id = ?").run(qty, row.id);
    res.json({ ok: true });
  });

  app.delete("/api/cart/items/:productId", (req, res) => {
    const productId = Number(req.params.productId);
    const owner = cartOwner(req);
    db.prepare("DELETE FROM cart_items WHERE owner = ? AND product_id = ?").run(owner, productId);
    res.json({ ok: true });
  });

  function requireUser(req, res) {
    const id = req.session?.userId;
    if (!id) {
      res.status(401).json({ error: "Sign in to use your wishlist." });
      return null;
    }
    return id;
  }

  app.get("/api/wishlist", (req, res) => {
    const userId = requireUser(req, res);
    if (!userId) return;
    const rows = db
      .prepare(
        `SELECT p.id as product_id, p.name, p.price, p.old_price, p.image, p.emoji, p.in_stock
         FROM wishlist_items w
         JOIN products p ON p.id = w.product_id
         WHERE w.user_id = ?
         ORDER BY w.created_at DESC`
      )
      .all(userId);
    const items = rows.map((r) => ({
      id: r.product_id,
      productId: r.product_id,
      name: r.name,
      price: r.price,
      oldPrice: r.old_price,
      image: r.image,
      img: r.emoji,
      inStock: r.in_stock === 1,
    }));
    res.json({ items });
  });

  app.post("/api/wishlist", (req, res) => {
    const userId = requireUser(req, res);
    if (!userId) return;
    const productId = Number(req.body?.productId);
    if (!Number.isFinite(productId)) {
      return res.status(400).json({ error: "productId is required." });
    }
    const product = db.prepare("SELECT id FROM products WHERE id = ?").get(productId);
    if (!product) {
      return res.status(404).json({ error: "Product not found." });
    }
    db.prepare("INSERT OR IGNORE INTO wishlist_items (user_id, product_id) VALUES (?, ?)").run(
      userId,
      productId
    );
    res.status(201).json({ ok: true });
  });

  app.delete("/api/wishlist/:productId", (req, res) => {
    const userId = requireUser(req, res);
    if (!userId) return;
    const productId = Number(req.params.productId);
    db.prepare("DELETE FROM wishlist_items WHERE user_id = ? AND product_id = ?").run(userId, productId);
    res.json({ ok: true });
  });

  app.post("/api/orders", (req, res) => {
    const email = String(req.body?.email || "")
      .trim()
      .toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ error: "Valid email is required." });
    }

    const owner = cartOwner(req);
    const lines = db
      .prepare(
        `SELECT c.id, c.product_id, c.qty, p.name, p.price, p.old_price, p.in_stock
         FROM cart_items c
         JOIN products p ON p.id = c.product_id
         WHERE c.owner = ?`
      )
      .all(owner);
    if (lines.length === 0) {
      return res.status(400).json({ error: "Your cart is empty." });
    }

    for (const line of lines) {
      if (line.in_stock !== 1) {
        return res.status(400).json({ error: `One or more items are out of stock: ${line.name}` });
      }
    }

    const subtotal = Math.round(lines.reduce((s, l) => s + l.price * l.qty, 0) * 100) / 100;
    const discount = Math.min(subtotal, Math.max(0, Number(req.body?.discount) || 0));
    const shipping = 0;
    const taxable = Math.max(0, subtotal - discount);
    const tax = Math.round(taxable * TAX_RATE * 100) / 100;
    const total = Math.round((taxable + tax + shipping) * 100) / 100;

    const firstName = String(req.body?.firstName || "").trim();
    const lastName = String(req.body?.lastName || "").trim();
    if (!firstName || !lastName) {
      return res.status(400).json({ error: "First and last name are required." });
    }

    const userId = req.session?.userId || null;

    const nextNumRow = db.prepare("SELECT COALESCE(MAX(id), 0) + 1 AS n FROM orders").get();
    const orderNumber = `HOC-2026-${String(nextNumRow.n).padStart(5, "0")}`;

    try {
      db.exec("BEGIN IMMEDIATE");
      const info = db
        .prepare(
          `INSERT INTO orders (
            order_number, email, user_id, status, subtotal, tax, discount, shipping, total,
            first_name, last_name, company, address, country, region, city, zip, phone, payment_method, notes
          ) VALUES (?, ?, ?, 'in_transit', ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
        )
        .run(
          orderNumber,
          email,
          userId,
          subtotal,
          tax,
          discount,
          shipping,
          total,
          firstName,
          lastName,
          String(req.body?.company || "").trim() || null,
          String(req.body?.address || "").trim() || null,
          String(req.body?.country || "").trim() || null,
          String(req.body?.region || "").trim() || null,
          String(req.body?.city || "").trim() || null,
          String(req.body?.zip || "").trim() || null,
          String(req.body?.phone || "").trim() || null,
          String(req.body?.payment || "").trim() || null,
          String(req.body?.notes || "").trim() || null
        );
      const orderId = info.lastInsertRowid;
      const insertLine = db.prepare(
        `INSERT INTO order_lines (order_id, product_id, name, unit_price, qty) VALUES (?, ?, ?, ?, ?)`
      );
      for (const l of lines) {
        insertLine.run(orderId, l.product_id, l.name, l.price, l.qty);
      }
      db.prepare("DELETE FROM cart_items WHERE owner = ?").run(owner);
      db.exec("COMMIT");
    } catch (e) {
      try {
        db.exec("ROLLBACK");
      } catch {
        /* ignore */
      }
      console.error(e);
      return res.status(500).json({ error: "Could not place order." });
    }

    res.status(201).json({
      order: {
        orderNumber,
        email,
        total,
        subtotal,
        tax,
        discount,
        shipping,
      },
    });
  });

  app.get("/api/orders/track", (req, res) => {
    const orderNumber = String(req.query?.orderNumber || req.query?.orderId || "").trim();
    const email = String(req.query?.email || "")
      .trim()
      .toLowerCase();
    if (!orderNumber || !email) {
      return res.status(400).json({ error: "Order number and email are required." });
    }
    const order = db
      .prepare("SELECT * FROM orders WHERE order_number = ? AND lower(email) = ?")
      .get(orderNumber, email);
    if (!order) {
      return res.status(404).json({ error: "No order found for that number and email." });
    }
    res.json({ tracking: buildTrackingPayload(order) });
  });
}
