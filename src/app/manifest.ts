import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    id: 'immo-gestion-v4',
    name: 'IMMO GESTION',
    short_name: 'IMMO GESTION',
    description: 'Application officielle de gestion immobilière et locative pour le Burkina Faso',
    start_url: '/?v=4',
    scope: '/',
    display: 'standalone',
    background_color: '#071B3A',
    theme_color: '#071B3A',
    orientation: 'portrait-primary',
    icons: [
      {
        src: '/icons/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/icons/icon-maskable-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/icons/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/icons/icon-maskable-192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/logo-officiel.png',
        sizes: '1024x1024',
        type: 'image/png',
        purpose: 'any',
      },
    ],
  };
}
