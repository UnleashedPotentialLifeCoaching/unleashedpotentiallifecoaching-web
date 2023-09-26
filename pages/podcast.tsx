import React from 'react';
import PodcastPage from 'components/pages/PodcastPage';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { QueryClient, QueryClientProvider } from 'react-query';
import { fetchAPI } from 'utils/api';
import { podcastPageContentQuery } from 'utils/queries';

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
  const podcastPageData = await fetchAPI(podcastPageContentQuery, {});
  const page = podcastPageData?.data?.simplePage;

  return {
    props: {
      page,
    },
  };
};

export default PodCast;
