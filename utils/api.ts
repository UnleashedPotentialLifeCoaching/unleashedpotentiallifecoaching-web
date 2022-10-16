import {
  CONTENTFUL_GRAPHQL_API_URL,
  CONTENTFUL_MANAGEMENT_API_ACCESS_TOKEN,
} from 'utils/constants';

export const headers = {
  'Content-Type': 'application/json',
  'User-Agent':
    'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.89 Safari/537.36',
  Accept: 'application/json; charset=UTF-8',
  Authorization: '',
};

export async function fetchAPI(query: string, { variables }: any = {}) {
  try {
    if (CONTENTFUL_GRAPHQL_API_URL) {
      headers.Authorization = `Bearer ${CONTENTFUL_MANAGEMENT_API_ACCESS_TOKEN}`;
    }

    const res = await fetch(CONTENTFUL_GRAPHQL_API_URL as string, {
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
