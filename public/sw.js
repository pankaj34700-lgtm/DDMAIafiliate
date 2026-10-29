// DDMAI Service Worker for PWA (v3 - Fresh Network Priority)
const CACHE_NAME = 'ddmai-cache-v3';

self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  // Purge all old caches immediately to ensure users receive latest updates
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => caches.delete(key))
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  // HTML documents and root navigation ALWAYS fetch fresh from network
  if (event.request.mode === 'navigate' || event.request.destination === 'document') {
    event.respondWith(
      fetch(event.request, { cache: 'no-store' }).catch(() => caches.match(event.request))
    );
    return;
  }
  
  // Static assets: network first with fallback
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});
