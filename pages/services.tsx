import { ICoachFields, IPageFields } from 'types/contentful';
import ServicesPage from 'components/pages/ServicesPage';
import {
  GetServerSideProps,
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from 'next';
import { fetchAPI } from 'utils/api';
import { coachesQuery, servicesPageQuery } from 'utils/queries';
import { CACHE_CONTROL, CACHE_LIFE } from 'utils/constants';

const Services = ({
  page,
  coaches,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const servicesPageProps = {
    page,
    coaches,
    pageContent: page?.pageContent,
  };

  return <ServicesPage {...servicesPageProps} />;
};

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  const servicesPageData = await fetchAPI(servicesPageQuery, {});
  const coachesData = await fetchAPI(coachesQuery, {});

  const page = servicesPageData?.data?.page as IPageFields;
  const coaches = coachesData?.data?.coachCollection?.items as ICoachFields[];

  context.res.setHeader(CACHE_CONTROL, CACHE_LIFE);

  return {
    props: {
      page,
      coaches,
    },
  };
};

export default Services;
