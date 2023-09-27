import React from 'react';
import PodcastPage from 'components/pages/PodcastPage';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { QueryClient, QueryClientProvider } from 'react-query';
import { fetchAPI } from 'utils/api';
import { simplePageQuery } from 'utils/queries';
import { PODCAST_PAGE_ID } from 'utils/constants';

const queryClient = new QueryClient();

const PodCast = ({ page }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const podcastPageProps = {
    page,
  };
  return (
    <QueryClientProvider client={queryClient}>
      <PodcastPage {...podcastPageProps} />
    </QueryClientProvider>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const podcastPageData = await fetchAPI(simplePageQuery(PODCAST_PAGE_ID), {});
  const page = podcastPageData?.data?.simplePage;

  return {
    props: {
      page,
    },
  };
};

export default PodCast;
