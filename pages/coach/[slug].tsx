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
import { ICoachFields } from 'types/contentful';
import { fetchAPI } from 'utils/api';
import { CACHE_CONTROL, CACHE_LIFE } from 'utils/constants';
import { urlify } from 'utils/helpers';
import { coachQuery } from 'utils/queries';

const CoachProfile = ({
  coach,
  coaches,
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

  return <CoachPage coach={coach} />;

  return null;
};

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  const slug = context?.params?.slug;
  const coachesData = await fetchAPI(coachQuery, {});
  const coaches = coachesData?.data?.coachCollection.items as ICoachFields[];

  const coach = coaches?.find(
    (coach) => urlify(coach?.name as string) === slug,
  ) as ICoachFields;

  if (!coach) {
    return {
      notFound: true,
    };
  }

  context.res.setHeader(CACHE_CONTROL, CACHE_LIFE);

  return {
    props: {
      coach,
      coaches,
      slug,
    },
  };
};

export default CoachProfile;
