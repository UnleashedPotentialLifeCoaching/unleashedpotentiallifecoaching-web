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

export const CAROUSEL_COACHES_LIST = ['Jessica Rebelo'];

export const CTA_CAROUSEL_ITEMS = [
  {
    source: '/images/cta-carousel/1.webp',
    alt: 'Jess Rebelo explaining EMDR therapy for processing distressing or traumatic memories',
  },
  {
    source: '/images/cta-carousel/2.webp',
    alt: 'Jess Rebelo providing specialized trauma therapy support to help individuals navigate their healing journey.',
  },
  {
    source: '/images/cta-carousel/3.webp',
    alt: 'Jess Rebelo, a trauma-informed life coach, offering guidance and support for a more fulfilling life.',
  },
  {
    source: '/images/cta-carousel/4.webp',
    alt: 'Jess Rebelo utilizing EMDR techniques to help clients with unprocessed trauma',
  },
  {
    source: '/images/cta-carousel/5.webp',
    alt: 'Jess Rebelo, a trauma therapist, using evidence-based techniques like EMDR and CBT for trauma healing.',
  },
  {
    source: '/images/cta-carousel/6.webp',
    alt: 'Jess Rebelo providing trauma-informed life coaching to help overcome challenges and improve well-being.',
  },
  {
    source: '/images/cta-carousel/7.webp',
    alt: 'Jess Rebelo discussing the benefits of EMDR in managing psychological and physical difficulties from past trauma',
  },
  {
    source: '/images/cta-carousel/8.webp',
    alt: 'Jess Rebelo guiding clients through emotional regulation and coping strategies in trauma-focused therapy sessions.',
  },
  {
    source: '/images/cta-carousel/9.webp',
    alt: "Jess Rebelo's trauma-informed coaching sessions focus on goal setting, resilience building, and personal growth.",
  },
];

export const PROFILE_CAROUSEL_ITEMS = [
  {
    source: '/images/profile/1.webp',
    alt: 'Jess Rebelo explaining EMDR therapy for processing distressing or traumatic memories',
  },
  {
    source: '/images/profile/2.webp',
    alt: 'Jess Rebelo providing specialized trauma therapy support to help individuals navigate their healing journey.',
  },
  {
    source: '/images/profile/3.webp',
    alt: 'Jess Rebelo, a trauma-informed life coach, offering guidance and support for a more fulfilling life.',
  },
];
export const GA_ID = 'G-X4HKDL4H2G';
