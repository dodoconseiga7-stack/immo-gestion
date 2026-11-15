// Service Worker IMMO GESTION - Version 4 (Force Purge Ancien Logo & WebAPK V4)
const CACHE_NAME = 'immo-gestion-v4';
const STATIC_ASSETS = [
  '/',
  '/login',
  '/dashboard',
  '/bureaux',
  '/maisons',
  '/locataires',
  '/loyers',
  '/paiements',
  '/depenses',
  '/comptabilite',
  '/travaux',
  '/rapports',
  '/recus',
  '/telecharger-app',
  '/logo-officiel.png',
  '/logo-fullbleed.png',
  '/icons/icon-192.png',
  '/icons/icon-512.png',
  '/icons/icon-maskable-192.png',
  '/icons/icon-maskable-512.png',
  '/apple-touch-icon.png',
  '/favicon-32x32.png',
  '/favicon.ico',
  '/manifest.json',
  '/manifest.webmanifest'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  // Purge immédiate et radicale de tout ancien cache (v1, v2, v3)
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request).catch(() => {
        return caches.match('/dashboard') || caches.match('/login') || caches.match('/');
      })
    );
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cached) => {
      return (
        cached ||
        fetch(event.request).then((response) => {
          return response;
        })
      );
    })
  );
});
