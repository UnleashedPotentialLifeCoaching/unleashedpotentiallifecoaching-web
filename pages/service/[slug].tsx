import { IServicePageFields } from 'types/contentful';
import ServicesPage from 'components/pages/ServicesPage';
import {
  GetServerSideProps,
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from 'next';
import { fetchAPI } from 'utils/api';
import { servicePageQuery } from 'utils/queries';
import { CACHE_CONTROL, CACHE_LIFE } from 'utils/constants';

const Service = ({
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
  const slug = context?.params?.slug as string;
  const servicesPageData = await fetchAPI(servicePageQuery(slug), {});

  if (servicesPageData?.servicePageCollection?.items.length <= 0) {
    return {
      notFound: true,
    };
  }

  //   const page = servicesPageData?.data?.page as IPageFields;
  const page = servicesPageData?.data.servicePageCollection?.items?.find(
    ({ slugText }: { slugText: string }) => slugText === slug,
  ) as IServicePageFields;

  context.res.setHeader(CACHE_CONTROL, CACHE_LIFE);

  return {
    props: {
      page,
      coaches: page?.coach ? [page?.coach] : [],
    },
  };
};

export default Service;
