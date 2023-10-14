import { IHomePageFields, ICoachFields } from 'types/contentful';
import HomePage from 'components/pages/HomePage';
import { GetStaticProps, InferGetServerSidePropsType } from 'next';
import { fetchContenfulAPI } from 'utils/api';
import { homePageQuery, coachesQuery } from 'utils/queries';

const Home = ({
  page,
  coaches,
}: InferGetServerSidePropsType<typeof getStaticProps>) => {
  const homePageProps = { page, coaches };
  return <HomePage {...homePageProps} />;
};

export const getStaticProps: GetStaticProps = async () => {
  const homePageData = await fetchContenfulAPI(homePageQuery, {});
  const coachesData = await fetchContenfulAPI(coachesQuery, {});
  const page = homePageData?.data?.homePage as IHomePageFields;
  const coaches = coachesData?.data?.coachCollection?.items as ICoachFields[];

  return {
    props: {
      page,
      coaches,
    },
  };
};

export default Home;
