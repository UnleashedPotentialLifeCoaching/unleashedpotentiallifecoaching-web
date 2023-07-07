import type { AppProps } from 'next/app';
import { useState } from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { CoachesProvider } from 'contexts/CoachesContext';
import Header from 'components/shared/Header';

const Footer = dynamic(() => import('components/shared/Footer'));

import 'styles/globals.css';

const SiteHead = () => (
  <Head>
    <meta charSet="utf-8" />
    <meta
      content="width=device-width,initial-scale=1,shrink-to-fit=no"
      name="viewport"
    />
    <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
    <meta name="msvalidate.01" content="D568BE2730F6C27E33061E84F8DE58B1" />
    <link rel="icon" href="/favicon.png" />
    <link rel="apple-touch-icon" href="/site-icon-apple.png" />
    <meta name="theme-color" content="#ffffff" />
  </Head>
);

const UnleashedPotentialApp = ({ Component, pageProps }: AppProps) => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <CoachesProvider>
        <SiteHead />
        <Header />
        <Component {...pageProps} />
        <Footer />
      </CoachesProvider>
    </QueryClientProvider>
  );
};

export default UnleashedPotentialApp;
