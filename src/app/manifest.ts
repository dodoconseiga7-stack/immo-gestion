import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'IMMO GESTION - Gestion Immobilière Professionnelle',
    short_name: 'IMMO',
    description: 'Application officielle de gestion immobilière et locative pour le Burkina Faso',
    start_url: '/dashboard',
    display: 'standalone',
    background_color: '#071B3A',
    theme_color: '#071B3A',
    orientation: 'portrait-primary',
    icons: [
      {
        src: '/logo.svg',
        sizes: '192x192 512x512',
        type: 'image/svg+xml',
        purpose: 'any',
      },
      {
        src: '/logo.svg',
        sizes: '512x512',
        type: 'image/svg+xml',
        purpose: 'maskable',
      },
    ],
  };
}

