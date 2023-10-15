import React from 'react';
import PodcastPage from 'components/pages/PodcastPage';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { fetchContenfulAPI } from 'utils/api';
import { simplePageQuery } from 'utils/queries';
import { siteConstants } from 'pages/api/site-constants';
import { IPageIds } from 'utils/types';

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
  const constants = await siteConstants();
  const pageId = constants.page_ids
    .filter((p: IPageIds) => p.page === 'podcast')
    .map((p: IPageIds) => p.id)[0];
  const podcastPageData = await fetchContenfulAPI(simplePageQuery(pageId), {});
  const page = podcastPageData?.data?.simplePage;

  return {
    props: {
      page,
    },
  };
};

export default PodCast;
