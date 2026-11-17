const VERSION = "aapadalens-v7";
const SHELL = [
  "/", "/index.html", "/styles.css", "/modules.css", "/app.js", "/phase1.js", "/phase2.js", "/phase3.js", "/phase4.js", "/phase5.js", "/phase6.js",
  "/modules.js", "/mod-shelters.js", "/mod-cyclone.js", "/mod-safety.js",
  "/aapadalens-logo.png", "/icon-192.png", "/icon-512.png", "/manifest.webmanifest",
  "/vendor/lottie/lottie_svg.min.js", "/assets/startup/weather.json",
  "/assets/theme/aapadalens-theme.wav",
  "/assets/startup/images/image_0.png", "/assets/startup/images/image_1.png",
  "/assets/startup/images/image_2.png", "/assets/startup/images/image_3.png",
  "/assets/startup/images/image_4.png", "/assets/startup/images/image_5.png",
  "/assets/startup/images/image_6.png", "/assets/startup/images/image_7.png",
  "/vendor/leaflet/leaflet.js", "/vendor/leaflet/leaflet.css",
  "/vendor/leaflet/images/marker-icon.png", "/vendor/leaflet/images/marker-icon-2x.png", "/vendor/leaflet/images/marker-shadow.png", "/vendor/leaflet/images/layers.png"
];
const TILE_HOST = "tile.openstreetmap.org";
const TILE_LIMIT = 300;

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(VERSION).then((cache) => cache.addAll(SHELL)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", (event) => {
  event.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((key) => key !== VERSION).map((key) => caches.delete(key)))).then(() => self.clients.claim()));
});

async function trimTiles(cache) {
  const keys = (await cache.keys()).filter((request) => request.url.includes(TILE_HOST));
  for (const request of keys.slice(0, Math.max(0, keys.length - TILE_LIMIT))) await cache.delete(request);
}

async function offlineResponse(cache, request) {
  const cached = await cache.match(request, { ignoreSearch: false });
  if (!cached) return null;
  const headers = new Headers(cached.headers);
  headers.set("X-AapadaLens-Offline-Cache", "true");
  return new Response(cached.body, { status: cached.status, statusText: cached.statusText, headers });
}

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") return;
  const url = new URL(request.url);
  const isTile = url.hostname === TILE_HOST;
  if (url.origin !== self.location.origin && !isTile) return;

  event.respondWith((async () => {
    const cache = await caches.open(VERSION);
    try {
      const response = await fetch(request);
      if (!response.ok && url.origin === self.location.origin && url.pathname.startsWith("/api/")) {
        const cached = await offlineResponse(cache, request);
        if (cached) return cached;
      }
      if (response.ok && (isTile || url.origin === self.location.origin)) {
        cache.put(request, response.clone()).then(() => (isTile ? trimTiles(cache) : null)).catch(() => {});
      }
      return response;
    } catch {
      const cached = await offlineResponse(cache, request);
      if (cached) return cached;
      if (request.mode === "navigate") { const shell = await cache.match("/index.html"); if (shell) return shell; }
      return new Response("Offline", { status: 503, statusText: "Offline" });
    }
  })());
});
