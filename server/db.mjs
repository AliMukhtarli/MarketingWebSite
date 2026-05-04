import { DatabaseSync } from "node:sqlite";
import fs from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const dataDir = join(__dirname, "data");
fs.mkdirSync(dataDir, { recursive: true });

const dbPath = join(dataDir, "app.db");
const db = new DatabaseSync(dbPath);

db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL COLLATE NOCASE,
    password_hash TEXT NOT NULL,
    name TEXT,
    created_at TEXT DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    price REAL NOT NULL,
    old_price REAL,
    image TEXT,
    emoji TEXT DEFAULT '📦',
    badge TEXT,
    in_stock INTEGER NOT NULL DEFAULT 1
  );

  CREATE TABLE IF NOT EXISTS cart_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    owner TEXT NOT NULL,
    product_id INTEGER NOT NULL REFERENCES products(id),
    qty INTEGER NOT NULL CHECK (qty >= 1),
    UNIQUE (owner, product_id)
  );

  CREATE TABLE IF NOT EXISTS wishlist_items (
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    product_id INTEGER NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    created_at TEXT DEFAULT (datetime('now')),
    PRIMARY KEY (user_id, product_id)
  );

  CREATE TABLE IF NOT EXISTS orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    order_number TEXT UNIQUE NOT NULL,
    email TEXT NOT NULL COLLATE NOCASE,
    user_id INTEGER REFERENCES users(id),
    status TEXT NOT NULL DEFAULT 'in_transit',
    created_at TEXT DEFAULT (datetime('now')),
    total REAL NOT NULL,
    subtotal REAL NOT NULL,
    tax REAL NOT NULL DEFAULT 0,
    discount REAL NOT NULL DEFAULT 0,
    shipping REAL NOT NULL DEFAULT 0,
    first_name TEXT,
    last_name TEXT,
    company TEXT,
    address TEXT,
    country TEXT,
    region TEXT,
    city TEXT,
    zip TEXT,
    phone TEXT,
    payment_method TEXT,
    notes TEXT
  );

  CREATE TABLE IF NOT EXISTS order_lines (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    order_id INTEGER NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    product_id INTEGER NOT NULL,
    name TEXT NOT NULL,
    unit_price REAL NOT NULL,
    qty INTEGER NOT NULL CHECK (qty >= 1)
  );

  CREATE INDEX IF NOT EXISTS idx_cart_owner ON cart_items(owner);
  CREATE INDEX IF NOT EXISTS idx_orders_email ON orders(email);
`);

function seedProducts() {
  const count = db.prepare("SELECT COUNT(*) as c FROM products").get().c;
  if (count > 0) return;

  const insert = db.prepare(
    `INSERT INTO products (id, name, price, old_price, image, emoji, badge, in_stock) VALUES (@id, @name, @price, @old_price, @image, @emoji, @badge, @in_stock)`
  );

  const rows = [
    {
      id: 1,
      name: "Xbox Series S - 512GB SSD Console with Wireless Controller - EU Version...",
      price: 442.12,
      old_price: 865.99,
      image: "/images/homepage/Xbox299.jpg",
      emoji: "🎮",
      badge: "HOT",
      in_stock: 1,
    },
    {
      id: 2,
      name: "Base Sport Earbuds -Wireless Earphones -Bluetooth In Ear...",
      price: 2300,
      old_price: null,
      image: "/images/homepage/FlipBuds.jpg",
      emoji: "🎧",
      badge: "HOT",
      in_stock: 1,
    },
    {
      id: 3,
      name: "Simple Mobile 4G LTE Prepaid Smartphone",
      price: 220,
      old_price: null,
      image: "/images/homepage/SmartPhone.jpg",
      emoji: "📱",
      badge: null,
      in_stock: 1,
    },
    {
      id: 4,
      name: "4K UHD LED Smart TV with Chromecast Built-in",
      price: 1.5,
      old_price: 868,
      image: "/images/homepage/TV.jpg",
      emoji: "📺",
      badge: null,
      in_stock: 1,
    },
    {
      id: 5,
      name: "Sony DSCHX8 High Zoom Point & Shoot Camera",
      price: 1280,
      old_price: null,
      image: "/images/homepage/Camera.jpg",
      emoji: "📷",
      badge: null,
      in_stock: 1,
    },
    {
      id: 6,
      name: "Dell Optiplex 7000x7480 All-in-One Computer Monitor",
      price: 299,
      old_price: null,
      image: "/images/homepage/Monitor2.jpg",
      emoji: "🖥️",
      badge: null,
      in_stock: 1,
    },
    {
      id: 7,
      name: "Portable Washing Machine, 11lbs capacity Model 18NMFIAM",
      price: 70,
      old_price: 865.99,
      image: "/images/homepage/AirConditioner.jpg",
      emoji: "🫧",
      badge: null,
      in_stock: 1,
    },
    {
      id: 8,
      name: "2-Barrel Carburetor Carb 2100 Engine Increase Horsepower",
      price: 160,
      old_price: null,
      image: "/images/homepage/Drone.jpg",
      emoji: "🔧",
      badge: "HOT",
      in_stock: 1,
    },
    {
      id: 9,
      name: "JBL FLIP 4 -Waterproof Portable Bluetooth Speaker -Black",
      price: 250,
      old_price: 360,
      image: "/images/homepage/HomePod.jpg",
      emoji: "🔊",
      badge: null,
      in_stock: 1,
    },
    {
      id: 10,
      name: "Amazon Basics High-Speed HDMI Cable (18 Gbps, 4K/60Hz)",
      price: 360,
      old_price: null,
      image: "/images/homepage/HDMI.jpg",
      emoji: "🔗",
      badge: null,
      in_stock: 1,
    },
    {
      id: 11,
      name: "Wired Over-Ear Gaming Headphones with USB",
      price: 1500,
      old_price: null,
      image: "/images/homepage/Headphone.jpg",
      emoji: "🎧",
      badge: null,
      in_stock: 1,
    },
  ];

  db.exec("BEGIN IMMEDIATE");
  try {
    for (const r of rows) insert.run(r);
    db.exec("COMMIT");
  } catch (e) {
    try {
      db.exec("ROLLBACK");
    } catch {
      /* ignore */
    }
    throw e;
  }
}

seedProducts();

export default db;
