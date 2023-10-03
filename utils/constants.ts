export const NEXT_PUBLIC_CONTENTFUL_GRAPHQL_API_URL: string | unknown =
  process.env.NEXT_PUBLIC_CONTENTFUL_GRAPHQL_API_URL;
export const NEXT_PUBLIC_CONTENTFUL_MANAGEMENT_API_ACCESS_TOKEN:
  | string
  | unknown = process.env.NEXT_PUBLIC_CONTENTFUL_MANAGEMENT_API_ACCESS_TOKEN;

export const BOOLEAN_CHOICE = [
  {
    name: 'Yes',
    checked: false,
  },
  {
    name: 'No',
    checked: true,
  },
];

export const SERVICES_OPTIONS = [
  {
    name: 'Excellent',
    checked: false,
  },
  {
    name: 'Good',
    checked: false,
  },
  {
    name: 'Disappointing',
    checked: false,
  },
];

export const SITE_NAVS = [
  {
    id: 1,
    slug: '/',
    label: 'Home',
  },
  {
    id: 2,
    slug: null,
    label: 'Our Team',
    children: [
      {
        id: 1,
        slug: '/coach/jessica-rebelo',
        label: 'Jessica Rebelo',
        open: false,
      },
      {
        id: 3,
        slug: 'https://themendwellness.com/',
        label: 'Kristin Brien',
        open: true,
      },
    ],
  },
  {
    id: 3,
    slug: '/services',
    label: 'Services',
  },
  {
    id: 5,
    slug: null,
    label: 'Media',
    children: [
      {
        id: 1,
        slug: '/blog',
        label: 'Blog',
      },
      {
        id: 2,
        slug: '/interviews',
        label: 'Interviews',
      },
      {
        id: 3,
        slug: '/podcast',
        label: 'Podcast',
      },
    ],
  },
  {
    id: 6,
    slug: '/reviews',
    label: 'Reviews',
  },
];

export const SERVICES_LIST = [
  {
    id: 1,
    slug: '/service/emdr',
    service: 'EMDR',
  },
];

export const BANNER_URL: string =
  'https://res.cloudinary.com/tumulty-web-services/image/upload/v1638888993/unleashedpotential/geoffroy-hauwen-hU_A4b397bQ-unsplash.webp';

export const FAILED_EMAIL_MESSAGE: string =
  'There was an issue with your submission, please email the details to unleashedpotential@gmail.com';
export const successEmailMessage = (page: string) =>
  `Thank you for your ${page} submission. We will reach out you shortly!`;

export const SEO_DEFAULTS = {
  title: 'Unleashed Potential Life Coaching',
  metaDescription:
    'Unleashed Potential: Life Coaching helps you uncover your purpose by identifying negative behaviors and giving a plan to achieve your goals.',
};

export const SITE_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://www.unleashedpotentiallifecoaching.com/'
    : 'http://localhost:3000';

export const CONTACT_INFO = [
  'Jessica: (631) 432-8897',
  'Unleashedpotentiallifecoaching@gmail.com',
];

export const SITE_TITLE = 'Unleashed Potential';

export const BLOG_PAGE_ID = '6zowWUPrZmyZ0HjQXBnoye';
export const PODCAST_PAGE_ID = '2TrjFekCNc6OGZAsLLB7WK';
export const REVIEWS_PAGE_ID = '7M8IWPzBF60jrl0SiHgUsW';
export const INTERVIEWS_PAGE_ID = '3o5X9MvYCjNeqDdHOQSFZd';

export const headers = {
  'Content-Type': 'application/json',
  'User-Agent':
    'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.89 Safari/537.36',
  Accept: 'application/json; charset=UTF-8',
  Authorization: '',
};

export const CACHE_CONTROL = 'Cache-Control';
export const CACHE_LIFE = 'public, s-maxage=300, stale-while-revalidate=59';
