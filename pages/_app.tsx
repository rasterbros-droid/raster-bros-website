import type { AppProps } from 'next/app';
import Head from 'next/head';
import { useEffect } from 'react';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Toaster } from '@/components/ui/toaster';
import { WhatsAppButton } from '@/components/WhatsAppButton';
import { satoshi, inter, spaceGrotesk } from '@/lib/fonts';

// Global styles (Tailwind + app CSS)
import '@/index.css';

export default function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    // Prevent stale service-worker caches from serving old chunk files.
    if (!('serviceWorker' in navigator)) return;

    navigator.serviceWorker
      .getRegistrations()
      .then((registrations) => {
        registrations.forEach((registration) => {
          registration.unregister();
        });
      })
      .catch(() => {});

    if (!('caches' in window)) return;

    caches
      .keys()
      .then((keys) => {
        keys.forEach((key) => {
          if (key.includes('raster-bros') || key.includes('next')) {
            caches.delete(key);
          }
        });
      })
      .catch(() => {});
  }, []);

  return (
    <div className={`${satoshi.variable} ${inter.variable} ${spaceGrotesk.variable}`}>
      <TooltipProvider>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        <Component {...pageProps} />
        <Toaster />
        <WhatsAppButton />
      </TooltipProvider>
    </div>
  );
}
