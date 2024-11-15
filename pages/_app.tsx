import type { AppProps } from 'next/app';
import React from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import { CoachesProvider } from 'contexts/CoachesContext';
import Header from 'components/shared/Header';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import 'styles/globals.css';
import { ConstantsProvider } from 'contexts/ConstantsContext';
import { GoogleAnalytics } from '@next/third-parties/google';
import { GA_ID } from 'utils/constants';
import { EmailsProvider } from 'contexts/EmailsContext';
import 'react-toastify/dist/ReactToastify.css';

const queryClient = new QueryClient();
const Footer = dynamic(() => import('components/shared/Footer'));

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
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ConstantsProvider>
          <CoachesProvider>
            <EmailsProvider>
              <SiteHead />
              <Header />
              <Component {...pageProps} />
              <Footer />
            </EmailsProvider>
          </CoachesProvider>
        </ConstantsProvider>
      </QueryClientProvider>
      <GoogleAnalytics gaId={GA_ID} />
    </>
  );
};

export default UnleashedPotentialApp;
