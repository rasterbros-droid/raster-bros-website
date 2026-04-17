// This project runs on Next.js dev/prod chunking.
// Old aggressive caching can serve stale JS and cause module/404 chunk errors.
// Keep this worker as a cleanup worker that unregisters itself.
self.addEventListener("install", () => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(keys.map((key) => caches.delete(key)));
      await self.clients.claim();
      await self.registration.unregister();
    })(),
  );
});

self.addEventListener("fetch", () => {
  // Intentionally no runtime caching.
});
