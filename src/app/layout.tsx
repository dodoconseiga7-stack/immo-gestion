import type { Metadata, Viewport } from 'next';
import './globals.css';
import SplashScreen from '@/components/SplashScreen';

export const metadata: Metadata = {
  title: 'IMMO GESTION - Gestion Immobilière Professionnelle',
  description: 'Application officielle de gestion immobilière et locative pour le Burkina Faso.',
  manifest: '/manifest.json',
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
    <html lang="fr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        {/* Logo officiel IMMO GESTION comme favicon et icône Apple */}
        <link rel="icon" type="image/jpeg" href="/logo-officiel.jpg" />
        <link rel="apple-touch-icon" href="/logo-officiel.jpg" />
        <link rel="apple-touch-icon" sizes="180x180" href="/logo-officiel.jpg" />
        <link rel="apple-touch-icon" sizes="152x152" href="/logo-officiel.jpg" />
        <link rel="apple-touch-icon" sizes="120x120" href="/logo-officiel.jpg" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="IMMO GESTION" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-TileImage" content="/logo-officiel.jpg" />
        <meta name="msapplication-TileColor" content="#071B3A" />
      </head>
      <body className="antialiased">
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
