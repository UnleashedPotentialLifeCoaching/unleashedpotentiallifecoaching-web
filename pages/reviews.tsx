import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ReviewsPage from 'components/pages/ReviewsPage';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import React from 'react';
import { IPageIds } from 'utils/types';
import { IReviewFields } from 'types/contentful';
import { fetchContenfulAPI } from 'utils/api';
import { reviewsQuery, simplePageQuery } from 'utils/queries';
import { REVIEWS_PAGE_ID } from 'utils/constants';

const queryClient = new QueryClient();

const Reviews = ({
  review,
  page,
  allReviews,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const pageProps = { review, page, allReviews };

  return (
    <QueryClientProvider client={queryClient}>
      <ReviewsPage {...pageProps} />
    </QueryClientProvider>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const reviewsData = await fetchContenfulAPI(reviewsQuery, {});
  const reviewPageData = await fetchContenfulAPI(
    simplePageQuery(REVIEWS_PAGE_ID),
    {},
  );

  const allReviews = reviewsData?.data?.reviewCollection
    ?.items as IReviewFields[];
  const page = reviewPageData?.data?.simplePage;

  return {
    props: {
      page,
      allReviews,
    },
  };
};

export default Reviews;
