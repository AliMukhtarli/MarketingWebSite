/**
 * Hocam API — Express + SQLite + cookie sessions.
 * Dev: run alongside Vite (npm run dev:all). Vite proxies /api → this server.
 */
import bcrypt from "bcryptjs";
import cors from "cors";
import express from "express";
import session from "express-session";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

import db from "./db.mjs";
import { mergeGuestCartToUser, mountShopRoutes } from "./shop.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const PORT = Number(process.env.PORT) || 3001;
const SESSION_SECRET = process.env.SESSION_SECRET || "hocam-dev-secret-change-in-production";
const IS_PROD = process.env.NODE_ENV === "production";

const app = express();

app.set("trust proxy", 1);

app.use(
  cors({
    /** Reflect request Origin so dev works on localhost, 127.0.0.1, or LAN IP (e.g. phone). */
    origin: true,
    credentials: true,
  })
);
app.use(express.json({ limit: "1mb" }));

app.use(
  session({
    name: "hocam.sid",
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      httpOnly: true,
      secure: IS_PROD,
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    },
  })
);

function currentUser(req) {
  const id = req.session?.userId;
  if (!id) return null;
  const row = db.prepare("SELECT id, email, name, created_at FROM users WHERE id = ?").get(id);
  return row || null;
}

app.get("/api/health", (_req, res) => {
  res.json({ ok: true, service: "hocam-api", shopApi: true });
});

app.get("/api/auth/me", (req, res) => {
  const user = currentUser(req);
  res.json({ user: user || null });
});

app.post("/api/auth/register", (req, res) => {
  const email = String(req.body?.email || "").trim().toLowerCase();
  const password = String(req.body?.password || "");
  const name = String(req.body?.name || "").trim() || null;

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: "Valid email is required." });
  }
  if (password.length < 6) {
    return res.status(400).json({ error: "Password must be at least 6 characters." });
  }

  const existing = db.prepare("SELECT id FROM users WHERE email = ?").get(email);
  if (existing) {
    return res.status(409).json({ error: "An account with this email already exists." });
  }

  const password_hash = bcrypt.hashSync(password, 10);
  const info = db
    .prepare("INSERT INTO users (email, password_hash, name) VALUES (?, ?, ?)")
    .run(email, password_hash, name);

  req.session.userId = info.lastInsertRowid;
  mergeGuestCartToUser(req);
  const user = db.prepare("SELECT id, email, name, created_at FROM users WHERE id = ?").get(info.lastInsertRowid);
  res.status(201).json({ user });
});

app.post("/api/auth/login", (req, res) => {
  const email = String(req.body?.email || "").trim().toLowerCase();
  const password = String(req.body?.password || "");

  const row = db.prepare("SELECT id, email, name, password_hash, created_at FROM users WHERE email = ?").get(email);
  if (!row || !bcrypt.compareSync(password, row.password_hash)) {
    return res.status(401).json({ error: "Invalid email or password." });
  }

  req.session.userId = row.id;
  mergeGuestCartToUser(req);
  const user = { id: row.id, email: row.email, name: row.name, created_at: row.created_at };
  res.json({ user });
});

mountShopRoutes(app);

app.post("/api/auth/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(500).json({ error: "Could not sign out." });
    res.clearCookie("hocam.sid");
    res.json({ ok: true });
  });
});

if (IS_PROD) {
  const dist = join(__dirname, "../dist");
  app.use(express.static(dist));
  app.get("*", (_req, res) => {
    res.sendFile(join(dist, "index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`API listening on http://localhost:${PORT}`);
});
