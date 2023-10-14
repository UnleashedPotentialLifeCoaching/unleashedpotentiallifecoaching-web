import {
  NEXT_PUBLIC_CONTENTFUL_GRAPHQL_API_URL,
  NEXT_PUBLIC_CONTENTFUL_MANAGEMENT_API_ACCESS_TOKEN,
  headers,
} from 'utils/constants';
import { useQuery } from '@tanstack/react-query';

export async function fetchContenfulAPI(query: string, variables: any) {
  try {
    if (NEXT_PUBLIC_CONTENTFUL_GRAPHQL_API_URL) {
      headers.Authorization = `Bearer ${NEXT_PUBLIC_CONTENTFUL_MANAGEMENT_API_ACCESS_TOKEN}`;
    }
    const res = await fetch(NEXT_PUBLIC_CONTENTFUL_GRAPHQL_API_URL as string, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        query,
        variables,
      }),
    });

    const json = await res.json();

    return json;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch API');
  }
}

export const useGetPosts = (
  label: string,
  query: string,
  variables: { limit?: number } = {},
) => {
  return useQuery(
    [label, variables],
    async () => {
      const request = await fetchContenfulAPI(query, variables);
      return request?.data;
    },
    { keepPreviousData: true },
  );
};

export const useGetSiteConstants = () => {
  return useQuery(['site_constants'], async () => {
    const request = await fetch('/api/site-constants');
    const res = await request?.json();

    return res;
  });
};
