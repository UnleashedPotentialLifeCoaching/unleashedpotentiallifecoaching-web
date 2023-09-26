import { IHomePageFields, ICoachFields } from 'types/contentful';
import HomePage from 'components/pages/HomePage';
import {
  GetServerSideProps,
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from 'next';
import { fetchAPI } from 'utils/api';
import { homePageQuery, coachesQuery } from 'utils/queries';

const Home = ({
  page,
  coaches,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const homePageProps = { page, coaches };

  return <HomePage {...homePageProps} />;
};

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  const homePageData = await fetchAPI(homePageQuery, {});
  const coachesData = await fetchAPI(coachesQuery, {});
  const page = homePageData?.data?.homePage as IHomePageFields;
  const coaches = coachesData?.data?.coachCollection?.items as ICoachFields[];

  context.res.setHeader(
    'Cache-Control',
    'public, s-maxage=300, stale-while-revalidate=59',
  );

  return {
    props: {
      page,
      coaches,
    },
  };
};

export default Home;
