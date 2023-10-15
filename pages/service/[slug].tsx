import { IServicePageFields } from 'types/contentful';
import ServicesPage from 'components/pages/ServicesPage';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { fetchContenfulAPI } from 'utils/api';
import { servicePageQuery } from 'utils/queries';
import { useRouter } from 'next/router';
import ErrorPage from 'next/error';
import { siteConstants } from 'pages/api/site-constants';

const Service = ({
  page,
  coaches,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const router = useRouter();
  const servicesPageProps = {
    page,
    coaches,
    pageContent: page?.pageContent,
  };

  if (router.isFallback) return <ErrorPage statusCode={404} />;
  return <ServicesPage {...servicesPageProps} />;
};

export const getStaticPaths = async () => {
  const constants = await siteConstants();
  return {
    fallback: true,
    paths: constants.service_list.map((service: any) => service?.slug),
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string;
  const servicesPageData = await fetchContenfulAPI(servicePageQuery(slug), {});

  if (servicesPageData?.servicePageCollection?.items.length <= 0) {
    return {
      notFound: true,
    };
  }

  //   const page = servicesPageData?.data?.page as IPageFields;
  const page = servicesPageData?.data.servicePageCollection?.items?.find(
    ({ slugText }: { slugText: string }) => slugText === slug,
  ) as IServicePageFields;

  return {
    props: {
      page,
      coaches: page?.coach ? [page?.coach] : [],
    },
  };
};

export default Service;
