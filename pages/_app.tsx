import type { AppProps } from 'next/app';
import Head from 'next/head';
import { useEffect } from 'react';
// import { CustomCursor } from '@/components/CustomCursor';

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
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>RasterBros - Turning Vision Into Pixels</title>
        <meta
          name="description"
          content="A creative film studio crafting cinematic stories through craft, technology, and intent."
        />
      </Head>
      {/* <CustomCursor /> */}
      <Component {...pageProps} />
    </>
  );
}
