import React, { useState, useEffect } from 'react';
import PodcastPage from 'components/pages/PodcastPage';
import {
  GetStaticProps,
  InferGetServerSidePropsType,
  InferGetStaticPropsType,
} from 'next';
import { YT_CHANNEL_URL_NEXT_PAGE } from 'utils/constants';
import { useInfiniteQuery } from '@tanstack/react-query';
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

const PodCast = ({
  review,
  page,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const [amount, setAmount] = useState<string>('4');

  const videoFetcher = async ({ pageParam = '' }) => {
    const url = YT_CHANNEL_URL_NEXT_PAGE(pageParam, amount);

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
      return pages[pages.length - 1].nextPageToken;
    },
  });

  const handleAmountChange = async () => {
    if (amount === '4') {
      await setAmount('1');
    }

    await fetchNextPage();
  };

  const podcastPageProps = {
    review,
    page,
    videos: organizeVideos(data),
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    handleAmountChange,
    message: isFetchingNextPage
      ? 'Loading more...'
      : hasNextPage
      ? 'Load More'
      : 'Nothing more to load',
  };

  return <PodcastPage {...podcastPageProps} />;
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
