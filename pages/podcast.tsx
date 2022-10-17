import React, { useState, useEffect } from 'react';
import PodcastPage from 'components/pages/PodcastPage';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { YT_CHANNEL_URL, YT_CHANNEL_URL_NEXT_PAGE } from 'utils/constants';
import { useQuery } from '@tanstack/react-query';
import { IReviewFields, ISimplePageFields } from 'types/contentful';
import { fetchAPI } from 'utils/api';

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

const PodCast = ({ review, page }: Props) => {
  const [nextPageToken, setNextPageToken] = useState<string>('');
  const [triggerNextPage, setTriggerNextPage] = useState<boolean>(false);
  const videoFetcher = async () => {
    const url =
      nextPageToken.length > 0
        ? YT_CHANNEL_URL_NEXT_PAGE(nextPageToken)
        : YT_CHANNEL_URL;

    const res = await fetch(url, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    const data = await res?.json();

    if (data?.nextPageToken) {
      setNextPageToken(data?.nextPageToken);
    }

    return data;
  };

  const { data } = useQuery(['videos'], videoFetcher);

  const podcastPageProps = {
    review,
    page,
    videos: data?.items,
    setTriggerNextPage,
    nextPageToken,
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
