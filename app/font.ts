import { Lato, Playfair_Display } from 'next/font/google';

export const lato = Lato({
  weight: ['100', '300', '400', '700', '900'],
  display: 'swap',
  subsets: ['latin'],
});

export const playFairDisplay = Playfair_Display({
  weight: ['800', '400', '500', '800', '900'],
  display: 'swap',
  subsets: ['latin'],
});
