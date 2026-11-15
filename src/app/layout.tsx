import type { Metadata, Viewport } from 'next';
import './globals.css';
import SplashScreen from '@/components/SplashScreen';

export const metadata: Metadata = {
  title: 'IMMO GESTION - Gestion Immobilière Professionnelle',
  description: 'Application officielle de gestion immobilière et locative pour le Burkina Faso.',
  manifest: '/manifest.json',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-32x32.png', type: 'image/png', sizes: '32x32' },
      { url: '/icons/icon-192.png', type: 'image/png', sizes: '192x192' },
      { url: '/icons/icon-512.png', type: 'image/png', sizes: '512x512' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'IMMO GESTION',
  },
};

export const viewport: Viewport = {
  themeColor: '#071B3A',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" style={{ backgroundColor: '#071B3A' }}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        {/* Favicon & Icônes Officielles Plein Bord (Sans cercle blanc) */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/icons/icon-192.png" />
        <link rel="icon" type="image/png" sizes="512x512" href="/icons/icon-512.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />

        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="IMMO GESTION" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="theme-color" content="#071B3A" />
        <meta name="msapplication-TileColor" content="#071B3A" />
        <meta name="msapplication-TileImage" content="/icons/icon-512.png" />

        {/* Style critique inline pour éliminer TOUT écran blanc à l'ouverture */}
        <style
          dangerouslySetInnerHTML={{
            __html: `
              html, body {
                background-color: #071B3A !important;
                margin: 0;
                padding: 0;
              }
              #initial-splash {
                position: fixed;
                inset: 0;
                z-index: 999999;
                background-color: #071B3A;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: opacity 0.5s ease;
              }
            `,
          }}
        />
      </head>
      <body className="antialiased" style={{ backgroundColor: '#071B3A' }}>
        {/* Splash screen natif immédiat : AUCUN ÉCRAN BLANC au clic */}
        <div id="initial-splash">
          <div
            style={{
              width: 'min(65vw, 240px)',
              height: 'min(65vw, 240px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/icons/icon-512.png"
              alt="IMMO GESTION"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                filter: 'drop-shadow(0 20px 45px rgba(0,0,0,0.65))',
              }}
            />
          </div>
        </div>

        <SplashScreen />
        {children}

        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js').catch(function(err) {
                    console.log('SW registration failed: ', err);
                  });
                });
              }
            `,
          }}
        />
      </body>
    </html>
  );
}
