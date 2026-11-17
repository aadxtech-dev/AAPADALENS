const http = require("node:http");
const fs = require("node:fs");
const path = require("node:path");
const os = require("node:os");

const { handleApi } = require("./api");

try { process.loadEnvFile(path.join(__dirname, ".env")); } catch { /* no .env file */ }

const root = path.resolve(__dirname);
const port = Number(process.env.PORT || 8000);
const phoneMode = process.argv.includes("--phone");
// Hosted mode: set PUBLIC_HOSTS to the deployed domain name(s), e.g. "aapadalens.onrender.com".
const publicHosts = new Set(String(process.env.PUBLIC_HOSTS || "").split(",").map((host) => host.trim().toLowerCase()).filter(Boolean));
const hostedMode = publicHosts.size > 0;
const networkInterfaces = Object.values(os.networkInterfaces()).flat().filter((item) => item && item.family === "IPv4" && !item.internal);
const lanAddresses = new Set(networkInterfaces.map((item) => item.address));
function ipv4Number(address) {
  const parts = address.split(".").map(Number);
  if (parts.length !== 4 || parts.some((part) => !Number.isInteger(part) || part < 0 || part > 255)) return null;
  return parts.reduce((value, part) => (value * 256 + part) >>> 0, 0);
}
function normalizeAddress(address) {
  return String(address || "").replace(/^::ffff:/i, "");
}
function isLoopback(address) {
  const normalized = normalizeAddress(address);
  return normalized === "::1" || normalized.startsWith("127.");
}
function isSameLan(address) {
  const remote = ipv4Number(normalizeAddress(address));
  if (remote === null) return false;
  return networkInterfaces.some((item) => {
    const local = ipv4Number(item.address);
    const mask = ipv4Number(item.netmask);
    return local !== null && mask !== null && (remote & mask) === (local & mask);
  });
}
function requestHostname(request) {
  try { return new URL(`http://${request.headers.host || ""}`).hostname.toLowerCase(); }
  catch { return ""; }
}
function allowedPhoneHost(hostname) {
  return hostname === "localhost" || hostname === "127.0.0.1" || lanAddresses.has(hostname);
}
function forbidden(response) {
  response.writeHead(403);
  response.end("Forbidden");
}
const contentTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".wav": "audio/wav",
  ".svg": "image/svg+xml",
  ".webmanifest": "application/manifest+json; charset=utf-8"
};

const server = http.createServer((request, response) => {
  const remoteAddress = request.socket.remoteAddress || "";
  if (hostedMode) {
    if (!publicHosts.has(requestHostname(request))) { forbidden(response); return; }
  } else {
    if (phoneMode && !isLoopback(remoteAddress) && !isSameLan(remoteAddress)) {
      forbidden(response);
      return;
    }
    if (phoneMode && !allowedPhoneHost(requestHostname(request))) {
      forbidden(response);
      return;
    }
  }
  let pathname, searchParams;
  try {
    const url = new URL(request.url, "http://localhost");
    pathname = decodeURIComponent(url.pathname);
    searchParams = url.searchParams;
  } catch {
    response.writeHead(400);
    response.end("Invalid request path");
    return;
  }

  if (pathname.startsWith("/api/")) {
    const host = request.headers.host || "";
    const hostname = requestHostname(request);
    const localHost = /^(127\.0\.0\.1|localhost)$/.test(hostname);
    const origin = request.headers.origin;
    const fetchSite = request.headers["sec-fetch-site"];
    const hostedOrigin = hostedMode && (origin === `https://${host}` || origin === `http://${host}`);
    if ((!hostedMode && !phoneMode && !/^(127\.0\.0\.1|localhost)(:\d+)?$/.test(host))
      || (!hostedMode && phoneMode && !allowedPhoneHost(hostname))
      || (origin && !hostedOrigin && origin !== `http://${host}`)
      || (!hostedMode && phoneMode && !localHost && !origin && request.method !== "GET" && fetchSite !== "same-origin")
      || (hostedMode && !origin && fetchSite !== "same-origin")) {
      forbidden(response);
      return;
    }
    handleApi(request, response, pathname, searchParams);
    return;
  }

  if (request.method !== "GET" && request.method !== "HEAD") {
    response.writeHead(405, { Allow: "GET, HEAD" });
    response.end("Method not allowed");
    return;
  }

  const requestedPath = pathname === "/" ? "index.html" : pathname.replace(/^\/+/, "");
  const filePath = path.resolve(root, requestedPath);
  const relativePath = path.relative(root, filePath);
  if (relativePath === ".." || relativePath.startsWith(`..${path.sep}`) || path.isAbsolute(relativePath) || ["server.js", "api.js", "backend.js"].includes(relativePath) || relativePath.startsWith(".") || relativePath.split(path.sep).some((part) => part.startsWith(".")) || relativePath.split(path.sep)[0] === "data") {
    response.writeHead(403);
    response.end("Forbidden");
    return;
  }

  fs.readFile(filePath, (error, content) => {
    if (error) {
      if (error.code === "ENOENT" || error.code === "EISDIR") {
        response.writeHead(404);
        response.end("Not found");
        return;
      }
      console.error("Could not read requested app file.", error);
      response.writeHead(500);
      response.end("Could not read app file");
      return;
    }

    response.writeHead(200, {
      "Cache-Control": "no-store",
      "Content-Type": contentTypes[path.extname(filePath).toLowerCase()] || "application/octet-stream",
      "X-Content-Type-Options": "nosniff"
    });
    response.end(request.method === "HEAD" ? undefined : content);
  });
});

server.on("error", (error) => {
  console.error("Could not start the AapadaLens local server.", error);
  process.exitCode = 1;
});

server.listen(port, hostedMode || phoneMode ? "0.0.0.0" : "127.0.0.1", () => {
  if (hostedMode) {
    console.log(`AapadaLens hosted mode for: ${[...publicHosts].join(", ")} (port ${port})`);
  } else if (phoneMode) {
    console.log("AapadaLens phone mode is available only to devices on this local network:");
    for (const address of lanAddresses) console.log(`  http://${address}:${port}`);
    if (!lanAddresses.size) console.warn("No non-loopback IPv4 network address found. Connect this computer to Wi-Fi or Ethernet and restart.");
    console.warn("Use only on a trusted private network; stop phone mode with Ctrl+C when finished.");
  } else {
    console.log(`AapadaLens running at http://127.0.0.1:${port}`);
  }
});
