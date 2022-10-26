/* eslint-disable react-hooks/exhaustive-deps */
import CoachPage from 'components/pages/CoachPage';
import { CoachesContext } from 'contexts/CoachesContext';
import {
  GetServerSideProps,
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from 'next';
import ErrorPage from 'next/error';
import { useRouter } from 'next/router';
import React, { useContext, useEffect } from 'react';
import { ICoachFields, IReviewFields } from 'types/contentful';
import { fetchAPI } from 'utils/api';
import { urlify } from 'utils/helpers';

const coachesQuery = `
query coachCollectionQuery {
  coachCollection {
    items {
      name
      biography {
        json
      }
      profileImage {
        url
        width
        height
      }
      welcomeMessage {
        json
      }
  	  seoTitle
      seoMetaDescription
      
    }
  }
}`;

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

const CoachProfile = ({
  coach,
  coaches,
  review,
  slug,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter();
  const { coaches: contextCoaches, setCoaches } = useContext(CoachesContext);
  useEffect(() => {
    if (!contextCoaches) {
      setCoaches(coaches);
    }
  }, [coaches]);

  if (!router.isFallback && !slug) {
    return <ErrorPage statusCode={404} />;
  }

  return <CoachPage coach={coach} review={review} />;

  return null;
};

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const slug = context?.params?.slug;
  const featuredReviewData = await fetchAPI(featuredReview, {});
  const coachesData = await fetchAPI(coachesQuery, {});
  const coaches = coachesData?.data?.coachCollection.items as ICoachFields[];

  const coach = coaches?.find(
    (coach) => urlify(coach?.name as string) === slug
  ) as ICoachFields;

  if (!coach) {
    return {
      notFound: true,
    };
  }

  const review = featuredReviewData?.data?.reviewCollection
    ?.items[0] as IReviewFields;

  context.res.setHeader(
    'Cache-Control',
    'public, s-maxage=300, stale-while-revalidate=59'
  );

  return {
    props: {
      coach,
      coaches,
      review,
      slug,
    },
  };
};

export default CoachProfile;
