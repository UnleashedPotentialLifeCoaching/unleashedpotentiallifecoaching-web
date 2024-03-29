export const NEXT_PUBLIC_CONTENTFUL_GRAPHQL_API_URL: string | unknown =
  process.env.NEXT_PUBLIC_CONTENTFUL_GRAPHQL_API_URL;
export const NEXT_PUBLIC_CONTENTFUL_MANAGEMENT_API_ACCESS_TOKEN:
  | string
  | unknown = process.env.NEXT_PUBLIC_CONTENTFUL_MANAGEMENT_API_ACCESS_TOKEN;
export const FAUNA_SECRET: string | undefined =
  process.env.NEXT_PUBLIC_FAUNA_SECRET;

export const FAILED_EMAIL_MESSAGE: string =
  'There was an issue with your submission, please email the details to unleashedpotential@gmail.com';
export const successEmailMessage = (page: string) =>
  `Thank you for your ${page} submission. We will reach out you shortly!`;

export const SITE_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://www.unleashedpotentiallifecoaching.com/'
    : 'http://localhost:3000';

export const CONTACT_INFO = [
  'Jessica: (631) 432-8897',
  'Unleashedpotentiallifecoaching@gmail.com',
];

export const headers = {
  'Content-Type': 'application/json',
  'User-Agent':
    'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.89 Safari/537.36',
  Accept: 'application/json; charset=UTF-8',
  Authorization: '',
};

export const CACHE_CONTROL = 'Cache-Control';
export const CACHE_LIFE = 'public, s-maxage=300, stale-while-revalidate=59';
