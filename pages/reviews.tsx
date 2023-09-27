import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ReviewsPage from 'components/pages/ReviewsPage';
import {
  GetServerSideProps,
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from 'next';
import React from 'react';
import { IReviewFields } from 'types/contentful';
import { fetchAPI } from 'utils/api';
import { REVIEWS_PAGE_ID } from 'utils/constants';
import { reviewsQuery, simplePageQuery } from 'utils/queries';

const queryClient = new QueryClient();

const Reviews = ({
  review,
  page,
  allReviews,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const pageProps = { review, page, allReviews };

  return (
    <QueryClientProvider client={queryClient}>
      <ReviewsPage {...pageProps} />
    </QueryClientProvider>
  );
};

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  const reviewsData = await fetchAPI(reviewsQuery, {});
  const reviewPageData = await fetchAPI(simplePageQuery(REVIEWS_PAGE_ID), {});

  const allReviews = reviewsData?.data?.reviewCollection
    ?.items as IReviewFields[];

  const page = reviewPageData?.data?.simplePage;

  context.res.setHeader(
    'Cache-Control',
    'public, s-maxage=300, stale-while-revalidate=59',
  );

  return {
    props: {
      page,
      allReviews,
    },
  };
};

export default Reviews;
