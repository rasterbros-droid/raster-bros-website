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
    <>
      {/*
        Font variables must live on :root, not on a wrapper element. `body` sets
        `font-family: var(--font-inter)`, and a variable defined on a child of
        body is invisible to body itself — the declaration would be dropped and
        text would fall back to the browser default (Times). Global scope also
        covers Radix portals, which render outside the React tree.
      */}
      <style jsx global>{`
        :root {
          --font-satoshi: ${satoshi.style.fontFamily};
          --font-inter: ${inter.style.fontFamily};
          --font-space-grotesk: ${spaceGrotesk.style.fontFamily};
        }
      `}</style>
      <TooltipProvider>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        <Component {...pageProps} />
        <Toaster />
        <WhatsAppButton />
      </TooltipProvider>
    </>
  );
}
