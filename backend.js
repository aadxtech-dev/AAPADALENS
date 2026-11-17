const { DatabaseSync } = require("node:sqlite");
const crypto = require("node:crypto");
const fs = require("node:fs");
const path = require("node:path");

const DATA_DIR = path.join(__dirname, "data");
fs.mkdirSync(DATA_DIR, { recursive: true });
const db = new DatabaseSync(path.join(DATA_DIR, "aapadalens.db"));
db.exec(`
PRAGMA journal_mode = WAL;
CREATE TABLE IF NOT EXISTS users (id TEXT PRIMARY KEY, username TEXT UNIQUE NOT NULL, name TEXT NOT NULL, role TEXT NOT NULL, salt TEXT NOT NULL, hash TEXT NOT NULL, created_at TEXT NOT NULL);
CREATE TABLE IF NOT EXISTS sessions (token_hash TEXT PRIMARY KEY, user_id TEXT NOT NULL, expires_at INTEGER NOT NULL);
CREATE TABLE IF NOT EXISTS shelters (id TEXT PRIMARY KEY, data TEXT NOT NULL, updated_by TEXT, updated_at TEXT NOT NULL);
CREATE TABLE IF NOT EXISTS reports (id TEXT PRIMARY KEY, data TEXT NOT NULL, status TEXT NOT NULL DEFAULT 'new', created_by TEXT, created_at TEXT NOT NULL, reviewed_by TEXT, reviewed_at TEXT);
CREATE TABLE IF NOT EXISTS audit (id INTEGER PRIMARY KEY AUTOINCREMENT, at TEXT NOT NULL, user_id TEXT, username TEXT, action TEXT NOT NULL, target TEXT);
`);

const ROLES = ["citizen", "volunteer", "admin"];
const SESSION_MS = 12 * 60 * 60 * 1000;
const COOKIE = "al_session";
const failures = new Map();

const hashToken = (token) => crypto.createHash("sha256").update(token).digest("hex");
const now = () => new Date().toISOString();
const clean = (value, max) => String(value ?? "").replace(/[\u0000-\u001f<>]/g, "").trim().slice(0, max);

function hashPassword(password, salt) { return crypto.scryptSync(password, salt, 64).toString("hex"); }
function audit(user, action, target = "") {
  db.prepare("INSERT INTO audit (at, user_id, username, action, target) VALUES (?, ?, ?, ?, ?)").run(now(), user?.id ?? null, user?.username ?? null, action, String(target).slice(0, 120));
}
function parseCookies(header) {
  const out = {};
  for (const part of String(header || "").split(";")) { const i = part.indexOf("="); if (i > 0) out[part.slice(0, i).trim()] = part.slice(i + 1).trim(); }
  return out;
}
function currentUser(request) {
  const token = parseCookies(request.headers.cookie)[COOKIE];
  if (!token) return null;
  const row = db.prepare("SELECT u.id, u.username, u.name, u.role, s.expires_at FROM sessions s JOIN users u ON u.id = s.user_id WHERE s.token_hash = ?").get(hashToken(token));
  if (!row) return null;
  if (row.expires_at < Date.now()) { db.prepare("DELETE FROM sessions WHERE token_hash = ?").run(hashToken(token)); return null; }
  return { id: row.id, username: row.username, name: row.name, role: row.role };
}
function startSession(response, user) {
  const token = crypto.randomBytes(32).toString("hex");
  db.prepare("DELETE FROM sessions WHERE expires_at < ?").run(Date.now());
  db.prepare("INSERT INTO sessions (token_hash, user_id, expires_at) VALUES (?, ?, ?)").run(hashToken(token), user.id, Date.now() + SESSION_MS);
  response.setHeader("Set-Cookie", `${COOKIE}=${token}; HttpOnly; SameSite=Strict; Path=/; Max-Age=${SESSION_MS / 1000}`);
}
function endSession(request, response) {
  const token = parseCookies(request.headers.cookie)[COOKIE];
  if (token) db.prepare("DELETE FROM sessions WHERE token_hash = ?").run(hashToken(token));
  response.setHeader("Set-Cookie", `${COOKIE}=; HttpOnly; SameSite=Strict; Path=/; Max-Age=0`);
}
function locked(username) {
  const entry = failures.get(username);
  return entry && entry.count >= 5 && Date.now() - entry.at < 5 * 60 * 1000;
}
function noteFailure(username) {
  const entry = failures.get(username);
  failures.set(username, { count: entry && Date.now() - entry.at < 5 * 60 * 1000 ? entry.count + 1 : 1, at: Date.now() });
}
const publicUser = (user) => ({ id: user.id, username: user.username, name: user.name, role: user.role });

function cleanShelter(input, existing = {}) {
  const lat = input.lat === "" || input.lat == null ? null : Number(input.lat), lon = input.lon === "" || input.lon == null ? null : Number(input.lon);
  const capacity = input.capacity === "" || input.capacity == null ? "" : Number(input.capacity);
  if (!clean(input.name, 120)) return null;
  if (capacity !== "" && (!Number.isFinite(capacity) || capacity < 0 || capacity > 1000000)) return null;
  if ((lat !== null && !(Math.abs(lat) <= 90)) || (lon !== null && !(Math.abs(lon) <= 180))) return null;
  return {
    ...existing, name: clean(input.name, 120), district: clean(input.district, 80), address: clean(input.address, 200), capacity,
    facilities: Array.isArray(input.facilities) ? input.facilities.slice(0, 20).map((f) => clean(f, 30)) : [],
    source: clean(input.source, 120), ...(lat !== null && lon !== null ? { lat, lon } : {})
  };
}

/* Returns true when the request was handled */
async function handleBackend(request, response, pathname, readJson, json) {
  if (!pathname.startsWith("/api/auth/") && !pathname.startsWith("/api/sync/") && !pathname.startsWith("/api/admin/")) return false;
  const method = request.method;
  const user = currentUser(request);

  if (pathname === "/api/auth/status" && method === "GET") {
    json(response, 200, { hasUsers: db.prepare("SELECT COUNT(*) AS n FROM users").get().n > 0, user });
  } else if (pathname === "/api/auth/register" && method === "POST") {
    const body = await readJson(request);
    const username = clean(body.username, 40).toLowerCase(), name = clean(body.name, 80), password = String(body.password ?? "");
    if (!/^[a-z0-9_.-]{3,40}$/.test(username) || !name || password.length < 8 || password.length > 200) { json(response, 400, { error: "invalid" }); return true; }
    if (db.prepare("SELECT 1 FROM users WHERE username = ?").get(username)) { json(response, 409, { error: "exists" }); return true; }
    const first = db.prepare("SELECT COUNT(*) AS n FROM users").get().n === 0;
    const salt = crypto.randomBytes(16).toString("hex");
    const created = { id: crypto.randomUUID(), username, name, role: first ? "admin" : "citizen" };
    db.prepare("INSERT INTO users (id, username, name, role, salt, hash, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)").run(created.id, username, name, created.role, salt, hashPassword(password, salt), now());
    audit(created, "register", created.role);
    startSession(response, created);
    json(response, 201, { user: publicUser(created) });
  } else if (pathname === "/api/auth/login" && method === "POST") {
    const body = await readJson(request);
    const username = clean(body.username, 40).toLowerCase();
    if (locked(username)) { json(response, 429, { error: "locked" }); return true; }
    const row = db.prepare("SELECT * FROM users WHERE username = ?").get(username);
    const expected = row ? Buffer.from(row.hash, "hex") : Buffer.alloc(64);
    const actual = Buffer.from(hashPassword(String(body.password ?? ""), row ? row.salt : "0".repeat(32)), "hex");
    if (!row || !crypto.timingSafeEqual(expected, actual)) { noteFailure(username); json(response, 401, { error: "credentials" }); return true; }
    failures.delete(username);
    startSession(response, row);
    audit(row, "login");
    json(response, 200, { user: publicUser(row) });
  } else if (pathname === "/api/auth/logout" && method === "POST") {
    if (user) audit(user, "logout");
    endSession(request, response);
    json(response, 200, { ok: true });
  } else if (pathname === "/api/sync/shelters" && method === "GET") {
    const rows = db.prepare("SELECT id, data, updated_by, updated_at FROM shelters ORDER BY updated_at DESC").all();
    json(response, 200, { items: rows.map((r) => ({ ...JSON.parse(r.data), id: r.id, updatedBy: r.updated_by, updatedAt: r.updated_at })) });
  } else if (pathname === "/api/sync/shelters" && method === "POST") {
    if (!user || !["volunteer", "admin"].includes(user.role)) { json(response, 403, { error: "forbidden" }); return true; }
    const body = await readJson(request);
    const list = Array.isArray(body.items) ? body.items.slice(0, 20) : [];
    let saved = 0;
    for (const input of list) {
      const id = clean(input.id, 60);
      if (!id) continue;
      const prev = db.prepare("SELECT data FROM shelters WHERE id = ?").get(id);
      const data = cleanShelter(input, prev ? JSON.parse(prev.data) : {});
      if (!data) continue;
      db.prepare("INSERT INTO shelters (id, data, updated_by, updated_at) VALUES (?, ?, ?, ?) ON CONFLICT(id) DO UPDATE SET data = excluded.data, updated_by = excluded.updated_by, updated_at = excluded.updated_at").run(id, JSON.stringify(data), user.username, now());
      audit(user, prev ? "shelter.update" : "shelter.create", id);
      saved += 1;
    }
    json(response, 200, { saved });
  } else if (pathname.startsWith("/api/sync/shelters/") && method === "DELETE") {
    if (!user || user.role !== "admin") { json(response, 403, { error: "forbidden" }); return true; }
    const id = clean(decodeURIComponent(pathname.slice("/api/sync/shelters/".length)), 60);
    db.prepare("DELETE FROM shelters WHERE id = ?").run(id);
    audit(user, "shelter.delete", id);
    json(response, 200, { ok: true });
  } else if (pathname === "/api/sync/reports" && method === "GET") {
    if (!user || !["volunteer", "admin"].includes(user.role)) { json(response, 403, { error: "forbidden" }); return true; }
    const rows = db.prepare("SELECT * FROM reports ORDER BY created_at DESC LIMIT 200").all();
    json(response, 200, { items: rows.map((r) => ({ ...JSON.parse(r.data), id: r.id, status: r.status, createdBy: r.created_by, createdAt: r.created_at, reviewedBy: r.reviewed_by, reviewedAt: r.reviewed_at })) });
  } else if (pathname === "/api/sync/reports" && method === "POST") {
    if (!user) { json(response, 401, { error: "login" }); return true; }
    const body = await readJson(request);
    const text = clean(body.text, 1000);
    if (!text) { json(response, 400, { error: "invalid" }); return true; }
    const id = crypto.randomUUID();
    db.prepare("INSERT INTO reports (id, data, created_by, created_at) VALUES (?, ?, ?, ?)").run(id, JSON.stringify({ text, category: clean(body.category, 40), urgency: ["low", "medium", "high"].includes(body.urgency) ? body.urgency : "low" }), user.username, now());
    audit(user, "report.create", id);
    json(response, 201, { id });
  } else if (pathname.startsWith("/api/sync/reports/") && method === "PATCH") {
    if (!user || !["volunteer", "admin"].includes(user.role)) { json(response, 403, { error: "forbidden" }); return true; }
    const id = clean(decodeURIComponent(pathname.slice("/api/sync/reports/".length)), 60);
    const body = await readJson(request);
    if (!["new", "verified", "rejected", "resolved"].includes(body.status)) { json(response, 400, { error: "invalid" }); return true; }
    const result = db.prepare("UPDATE reports SET status = ?, reviewed_by = ?, reviewed_at = ? WHERE id = ?").run(body.status, user.username, now(), id);
    if (!result.changes) { json(response, 404, { error: "not found" }); return true; }
    audit(user, `report.${body.status}`, id);
    json(response, 200, { ok: true });
  } else if (pathname === "/api/admin/users" && method === "GET") {
    if (!user || user.role !== "admin") { json(response, 403, { error: "forbidden" }); return true; }
    json(response, 200, { items: db.prepare("SELECT id, username, name, role, created_at AS createdAt FROM users ORDER BY created_at").all() });
  } else if (pathname.startsWith("/api/admin/users/") && method === "PATCH") {
    if (!user || user.role !== "admin") { json(response, 403, { error: "forbidden" }); return true; }
    const id = clean(decodeURIComponent(pathname.slice("/api/admin/users/".length)), 60);
    const body = await readJson(request);
    if (!ROLES.includes(body.role) || id === user.id) { json(response, 400, { error: "invalid" }); return true; }
    const result = db.prepare("UPDATE users SET role = ? WHERE id = ?").run(body.role, id);
    if (!result.changes) { json(response, 404, { error: "not found" }); return true; }
    audit(user, "user.role", `${id}:${body.role}`);
    json(response, 200, { ok: true });
  } else if (pathname === "/api/admin/audit" && method === "GET") {
    if (!user || user.role !== "admin") { json(response, 403, { error: "forbidden" }); return true; }
    json(response, 200, { items: db.prepare("SELECT at, username, action, target FROM audit ORDER BY id DESC LIMIT 200").all() });
  } else {
    json(response, 404, { error: "Not found" });
  }
  return true;
}

module.exports = { handleBackend };
