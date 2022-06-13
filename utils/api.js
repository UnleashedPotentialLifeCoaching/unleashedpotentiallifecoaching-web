import Prismic from 'prismic-javascript';
import {
  API_LOCALE,
  API_TOKEN,
  GRAPHQL_API_URL,
  REF_API_URL,
} from 'utils/constants';
import {
  allCoachesSchema,
  allReviewsPageSchema,
  allReviewsSchema,
  homePageSchema,
  ourStorySchema,
  servicesPageSchema,
  podcastPageSchema,
  allBlogsSchema,
  blogPageSchema,
  blogPostSchema,
} from 'utils/schemas';

export const PrismicClient = Prismic.client(REF_API_URL, {
  accessToken: API_TOKEN,
});

const fetchAPI = async (query, { previewData, variables } = {}) => {
  const prismicAPI = await PrismicClient.getApi();
  const res = await fetch(
    `${GRAPHQL_API_URL}?query=${query}&variables=${JSON.stringify(variables)}`,
    {
      headers: {
        'Prismic-Ref': previewData?.ref || prismicAPI.masterRef.ref,
        'Content-Type': 'application/json',
        'Accept-Language': API_LOCALE,
        Authorization: `Token ${API_TOKEN}`,
      },
    }
  );

  if (res.status !== 200) {
    console.error(await res.text());
    throw new Error('Failed to fetch API');
  }

  const json = await res.json();
  if (json.errors) {
    console.error(json.errors);
    throw new Error('Failed to fetch API');
  }
  return json.data;
};

/** Page Query */
export const homePageQuery = async () => {
  const data = await fetchAPI(homePageSchema);

  return data.allHome_pages?.edges[0]?.node;
};

/** Coaches Query */
export const coachesQuery = async () => {
  const data = await fetchAPI(allCoachesSchema);

  return data.allCoachs?.edges;
};

/** Reviews Query */
export const reviewsQuery = async () => {
  const data = await fetchAPI(allReviewsSchema);

  return data.allReviewss?.edges.sort((a, b) =>
    a.node._meta.firstPublicationDate < b.node._meta.firstPublicationDate
      ? 1
      : -1
  );
};

export const reviewsPageQuery = async () => {
  const data = await fetchAPI(allReviewsPageSchema);

  return data.allReviews_pages?.edges;
};

export const servicesQuery = async () => {
  const data = await fetchAPI(servicesPageSchema);

  return data.allServices_pages?.edges;
};

export const ourStoryQuery = async () => {
  const data = await fetchAPI(ourStorySchema);

  return data.allOur_storys?.edges;
};

export const podcastQuery = async () => {
  const data = await fetchAPI(podcastPageSchema);

  return data.allPodcast_pages?.edges;
};

export const allBlogsQuery = async () => {
  const data = await fetchAPI(allBlogsSchema);

  return data?.allBlog_posts?.edges;
};

export const blogPageQuery = async () => {
  const data = await fetchAPI(blogPageSchema);
  return data?.allBlog_pages?.edges;
};

export const blogPostQuery = async (uid) => {
  const data = await fetchAPI(blogPostSchema(uid));

  return data?.blog_post
}
