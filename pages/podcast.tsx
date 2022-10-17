import React, { useState, useEffect } from 'react';
import PodcastPage from 'components/pages/PodcastPage';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { YT_CHANNEL_URL, YT_CHANNEL_URL_NEXT_PAGE } from 'utils/constants';
import { useInfiniteQuery } from '@tanstack/react-query';
import { IReviewFields, ISimplePageFields } from 'types/contentful';
import { fetchAPI } from 'utils/api';
import { isCompositeType } from 'graphql';

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

interface Props {
  review: IReviewFields;
  page: ISimplePageFields;
}

interface VIDEO_PROPS {}

const PodCast = ({ review, page }: Props) => {
  const videoFetcher = async ({ pageParam = '' }) => {
    const url = YT_CHANNEL_URL_NEXT_PAGE(pageParam);

    const res = await fetch(url, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    const data = await res?.json();

    return data;
  };

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery(['videos'], videoFetcher, {
    getNextPageParam: (_, pages) => {
      return pages[0].nextPageToken;
    },
  });

  const podcastPageProps = {
    review,
    page,
    videos: data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    message: isFetchingNextPage
      ? 'Loading more...'
      : hasNextPage
      ? 'Load More'
      : 'Nothing more to load',
  };

  return <PodcastPage {...podcastPageProps} />;
};

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const podcastPageData = await fetchAPI(podcastPageQuery, {});
  const featuredReviewData = await fetchAPI(featuredReview, {});
  const review = featuredReviewData?.data?.reviewCollection
    ?.items[0] as IReviewFields;
  const page = podcastPageData?.data?.simplePage;

  context.res.setHeader(
    'Cache-Control',
    'public, s-maxage=864000, stale-while-revalidate=59'
  );

  return {
    props: {
      review,
      page,
    },
  };
};

export default PodCast;
