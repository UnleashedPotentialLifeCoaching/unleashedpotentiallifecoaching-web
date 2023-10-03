/* eslint-disable react-hooks/exhaustive-deps */
import CoachPage from 'components/pages/CoachPage';
import { CoachesContext } from 'contexts/CoachesContext';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import ErrorPage from 'next/error';
import { useRouter } from 'next/router';
import React, { useContext, useEffect } from 'react';
import { ICoachFields } from 'types/contentful';
import { fetchAPI } from 'utils/api';
import { urlify } from 'utils/helpers';
import { coachQuery } from 'utils/queries';
import { SITE_NAVS } from 'utils/constants';

const CoachProfile = ({
  coach,
  coaches,
  slug,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const router = useRouter();
  const { coaches: contextCoaches, setCoaches } = useContext(CoachesContext);
  useEffect(() => {
    if (!contextCoaches) {
      setCoaches(coaches);
    }
  }, [coaches]);

  if (router.isFallback && !slug) {
    return <ErrorPage statusCode={404} />;
  }

  return <CoachPage coach={coach} />;

  return null;
};

export const getStaticPaths = async () => {
  const coachesItem = SITE_NAVS.filter((nav: any) => nav.id === 2)[0];
  const coacheSlugs = coachesItem?.children
    ?.filter((coach: any) => !coach?.slug?.includes('themendwellness'))
    .map((coach: any) => `${coach?.slug}`);

  return {
    fallback: true,
    paths: {
      fallback: true,
      paths: coacheSlugs,
    },
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug;
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

  return {
    props: {
      coach,
      coaches,
      slug,
    },
  };
};

export default CoachProfile;
