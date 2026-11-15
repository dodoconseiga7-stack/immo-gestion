// Service Worker IMMO GESTION - Version 5 (Haute Performance & Anti-Bug Navigation)
const CACHE_NAME = 'immo-gestion-v5';

// Uniquement les assets statiques de base (pas de pages HTML dynamiques pour éviter les conflits RSC)
const STATIC_ASSETS = [
  '/manifest.json',
  '/manifest.webmanifest',
  '/favicon.ico',
  '/favicon-32x32.png',
  '/icons/icon-192.png',
  '/icons/icon-512.png',
  '/icons/icon-maskable-192.png',
  '/icons/icon-maskable-512.png',
  '/apple-touch-icon.png',
  '/logo-officiel.png'
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
  // Purge radicale de tous les anciens caches
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
  const url = new URL(event.request.url);

  // 1. NE JAMAIS intercepter les requêtes internes Next.js (RSC, API, Webpack HMR)
  // Cela élimine 100% des erreurs "This page couldn't load" lors de la navigation
  if (
    url.searchParams.has('_rsc') ||
    event.request.headers.get('RSC') === '1' ||
    url.pathname.startsWith('/api/') ||
    event.request.method !== 'GET'
  ) {
    return; // Laisse passer directement au réseau natif sans interception
  }

  // 2. Navigation de page (Network-first avec fallback)
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request).catch(async () => {
        const cached = await caches.match(event.request);
        if (cached) return cached;
        const dashboard = await caches.match('/dashboard');
        return dashboard || Response.error();
      })
    );
    return;
  }

  // 3. Fichiers statiques (icônes, images)
  if (
    url.pathname.startsWith('/icons/') ||
    url.pathname.startsWith('/images/') ||
    url.pathname.endsWith('.png') ||
    url.pathname.endsWith('.jpg') ||
    url.pathname.endsWith('.ico')
  ) {
    event.respondWith(
      caches.match(event.request).then((cached) => {
        if (cached) return cached;
        return fetch(event.request).then((response) => {
          if (response && response.status === 200) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
          }
          return response;
        }).catch(() => cached || Response.error());
      })
    );
    return;
  }

  // Tout le reste passe au réseau normalement
});
