// Service Worker IMMO GESTION
const CACHE_NAME = 'immo-gestion-v1';
const STATIC_ASSETS = [
  '/',
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
  '/logo.svg',
  '/manifest.json'
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
  // Stratégie Network-first avec fallback cache pour les données fraîches
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request).catch(() => {
        return caches.match('/dashboard') || caches.match('/');
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

