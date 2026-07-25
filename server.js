/* Prime Restaurant — ordering server
 * Serves the website, stores orders in data/orders.json and exposes a tiny API
 * used by the customer site (public/index.html) and the admin dashboard
 * (public/admin.html).
 */
const express = require("express");
const fs = require("fs");
const path = require("path");
const os = require("os");
const QRCode = require("qrcode");

const PORT = process.env.PORT || 3000;
const DATA_DIR = path.join(__dirname, "data");
const DATA_FILE = path.join(DATA_DIR, "orders.json");
const STATUSES = ["new", "preparing", "served", "cancelled"];

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

function readOrders() {
  if (!fs.existsSync(DATA_FILE)) return [];
  try {
    return JSON.parse(fs.readFileSync(DATA_FILE, "utf8"));
  } catch (err) {
    console.error("Could not read orders.json, starting fresh:", err.message);
    return [];
  }
}

function writeOrders(orders) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
  fs.writeFileSync(DATA_FILE, JSON.stringify(orders, null, 2));
}

function localAddress() {
  const nets = os.networkInterfaces();
  for (const name of Object.keys(nets)) {
    for (const net of nets[name]) {
      if (net.family === "IPv4" && !net.internal) return net.address;
    }
  }
  return "localhost";
}

function siteUrl(req) {
  if (process.env.PUBLIC_URL) return process.env.PUBLIC_URL;
  if (req) return req.protocol + "://" + req.get("host");
  return "http://" + localAddress() + ":" + PORT;
}

app.get("/api/orders", (req, res) => {
  res.json(readOrders());
});

app.post("/api/orders", (req, res) => {
  const body = req.body || {};
  const items = Array.isArray(body.items) ? body.items : [];

  if (!body.customer || !items.length) {
    return res.status(400).json({ error: "customer and at least one item are required" });
  }

  const orders = readOrders();
  const order = {
    id: Date.now().toString(36) + Math.random().toString(36).slice(2, 7),
    number: orders.length ? orders[orders.length - 1].number + 1 : 1001,
    customer: String(body.customer).slice(0, 80),
    phone: String(body.phone || "").slice(0, 30),
    table: String(body.table || "Takeaway").slice(0, 30),
    notes: String(body.notes || "").slice(0, 200),
    items: items.map((item) => ({
      name: String(item.name).slice(0, 80),
      price: Number(item.price) || 0,
      qty: Math.max(1, Math.min(50, Number(item.qty) || 1))
    })),
    status: "new",
    createdAt: new Date().toISOString()
  };
  order.total = Number(order.items.reduce((sum, i) => sum + i.price * i.qty, 0).toFixed(2));

  orders.push(order);
  writeOrders(orders);
  console.log(`Order #${order.number} — ${order.customer} (${order.table}) — $${order.total}`);
  res.status(201).json(order);
});

app.patch("/api/orders/:id", (req, res) => {
  const status = req.body && req.body.status;
  if (!STATUSES.includes(status)) {
    return res.status(400).json({ error: "status must be one of " + STATUSES.join(", ") });
  }
  const orders = readOrders();
  const order = orders.find((o) => o.id === req.params.id);
  if (!order) return res.status(404).json({ error: "order not found" });

  order.status = status;
  order.updatedAt = new Date().toISOString();
  writeOrders(orders);
  res.json(order);
});

app.delete("/api/orders", (req, res) => {
  writeOrders([]);
  res.json({ cleared: true });
});

app.get("/api/site-url", (req, res) => {
  res.json({ url: siteUrl(req), lan: "http://" + localAddress() + ":" + PORT });
});

app.get("/qr.png", async (req, res) => {
  const target = req.query.url || siteUrl(req);
  try {
    const png = await QRCode.toBuffer(target, {
      width: 600,
      margin: 2,
      color: { dark: "#0e0f0d", light: "#ffffff" }
    });
    res.type("png").send(png);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, "0.0.0.0", () => {
  const lan = "http://" + localAddress() + ":" + PORT;
  console.log("\nPrime Restaurant is running");
  console.log("  Website (this computer): http://localhost:" + PORT);
  console.log("  Website (phone, same wifi): " + lan);
  console.log("  Admin dashboard: http://localhost:" + PORT + "/admin.html");
  console.log("  QR code for customers: http://localhost:" + PORT + "/qr.png\n");
});
