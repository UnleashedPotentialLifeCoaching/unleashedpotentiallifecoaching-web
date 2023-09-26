import ReviewsPage from 'components/pages/ReviewsPage';
import {
  GetServerSideProps,
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from 'next';
import React from 'react';
import { IReviewFields } from 'types/contentful';
import { fetchAPI } from 'utils/api';
import { reviewPageQuery, reviewsQuery } from 'utils/queries';

const Reviews = ({
  review,
  page,
  allReviews,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const pageProps = { review, page, allReviews };
  return <ReviewsPage {...pageProps} />;
};

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  const reviewsData = await fetchAPI(reviewsQuery, {});
  const reviewPageData = await fetchAPI(reviewPageQuery, {});

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
