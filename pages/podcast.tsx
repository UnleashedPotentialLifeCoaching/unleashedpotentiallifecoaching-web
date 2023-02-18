import React, { useState, useEffect } from 'react';
import PodcastPage from 'components/pages/PodcastPage';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { QueryClient, QueryClientProvider } from 'react-query';
import { IReviewFields, ISimplePageFields } from 'types/contentful';
import { fetchAPI } from 'utils/api';
import { organizeVideos } from 'utils/helpers';

const featuredReview = `query reviewCollectionQuery {
  reviewCollection(
    limit: 1,
    where:{
    featuredReview: true
  }) {
    items {
      name
      quote{
        json
      }
    }
  }
}`;

const podcastPageQuery = `
  query simplePageEntryQuery {
  simplePage(id: "2TrjFekCNc6OGZAsLLB7WK") {
    pageTitle
    seoTitle
    seoMetaDescription
    banner {
      url
    }
  }
}
`;

const queryClient = new QueryClient();

const PodCast = ({
  review,
  page,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const podcastPageProps = {
    review,
    page,
  };
  return (
    <QueryClientProvider client={queryClient}>
      <PodcastPage {...podcastPageProps} />
    </QueryClientProvider>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const podcastPageData = await fetchAPI(podcastPageQuery, {});
  const featuredReviewData = await fetchAPI(featuredReview, {});
  const review = featuredReviewData?.data?.reviewCollection
    ?.items[0] as IReviewFields;
  const page = podcastPageData?.data?.simplePage;

  return {
    props: {
      review,
      page,
    },
  };
};

export default PodCast;
