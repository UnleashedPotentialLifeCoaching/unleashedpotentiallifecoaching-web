export const REPOSITORY: string | unknown = process.env.PRISMIC_REPOSITORY_NAME;
export const REF_API_URL: string = `https://${REPOSITORY}.cdn.prismic.io/api/v2`;
export const GRAPHQL_API_URL: string = `https://${REPOSITORY}.cdn.prismic.io/graphql`;
export const API_TOKEN: string | unknown = process.env.PRISMIC_API_TOKEN;
export const API_LOCALE: string | unknown =
  process.env.PRISMIC_REPOSITORY_LOCALE;
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
        open: false
      },
      {
        id: 2,
        slug: '/coach/ron-lombardi',
        label: 'Ron Lombardi',
        open: false
      },
      {
        id: 3,
        slug: '/coach/ché-greeff',
        label: 'Ché Greeff',
        open: false
      },
      {
        id: 4,
        slug: 'https://themendwellness.com/',
        label: 'Kristin Brien',
        open: true
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
const YT_CHANNEL_BASE = `https://www.googleapis.com/youtube/v3/search?key=${process.env.NEXT_PUBLIC_YT_API_KEY}&channelId=${process.env.NEXT_PUBLIC_CHANNEL_ID}`;
export const YT_CHANNEL_URL = `${YT_CHANNEL_BASE}&part=snippet,id&order=date&maxResults=4`;
export const YT_CHANNEL_URL_NEXT_PAGE = (nextPageToken: string) =>
  `${YT_CHANNEL_BASE}&part=snippet,id&order=date&maxResults=1&pageToken=${nextPageToken}`;

  export const CONTACT_INFO = [
    'Jessica: (631) 432-8897',
    'Unleashedpotentiallifecoaching@gmail.com',
  ];
