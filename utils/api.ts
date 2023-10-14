import {
  NEXT_PUBLIC_CONTENTFUL_GRAPHQL_API_URL,
  NEXT_PUBLIC_CONTENTFUL_MANAGEMENT_API_ACCESS_TOKEN,
  FAUNA_SECRET,
  headers,
} from 'utils/constants';
import { useQuery } from '@tanstack/react-query';
import { Client, fql } from 'fauna';

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

const client = new Client({
  secret: FAUNA_SECRET,
});

export const getSiteConstants = async () => {
  try {
    const collectionExists = fql`site_constants.all()`;
    const request = await client.query(collectionExists);

    //@ts-ignore
    const requestData = request?.data?.data;

    return {
      banner_url: requestData.filter((item: any) =>
        Object.keys(item).includes('banner_url'),
      )[0].banner_url,
      boolean_choices: requestData.filter((item: any) =>
        Object.keys(item).includes('boolean_choices'),
      )[0].boolean_choices,
      page_ids: requestData.filter((item: any) =>
        Object.keys(item).includes('page_ids'),
      )[0].page_ids,
      service_list: requestData.filter((item: any) =>
        Object.keys(item).includes('service_list'),
      )[0].service_list,
      service_options: requestData.filter((item: any) =>
        Object.keys(item).includes('service_options'),
      )[0].service_options,
      site_navigation: requestData.filter((item: any) =>
        Object.keys(item).includes('site_navigation'),
      )[0].site_navigation,
      seo_default: requestData.filter((item: any) =>
        Object.keys(item).includes('seo_default'),
      )[0].seo_default,
      site_title: requestData.filter((item: any) =>
        Object.keys(item).includes('site_title'),
      )[0].site_title,
    };
  } catch (error) {
    console.error('Error retrieving site constants:', error);
    throw error;
  }
};
