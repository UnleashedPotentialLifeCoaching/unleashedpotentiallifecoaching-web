import {
  ICoachFields,
  IReviewFields,
  IPageFields,
  IServicePageFields,
} from 'types/contentful';
import ServicesPage from 'components/pages/ServicesPage';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { fetchAPI } from 'utils/api';

const servicePageQuery = (slug: string) => `
  query servicePageCollectionQuery {
  servicePageCollection(
    where:{
    slugText:"${slug}"
  }, limit: 1) {
    items {
        pageTitle
        seoTitle
        seoMetaDescription
        slugText
        coach{
        ... on Coach {
            name
            appearanceOrder
            bookTimePhoto {
                url
                width
                height
        } 
      }
    }
    pageContent {
      json
    }
  }
    }
  }

`;

const featuredReview = `query reviewCollectionQuery {
  reviewCollection(where:{
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

interface Props {
  page: IPageFields;
  coaches: ICoachFields[];
  review: IReviewFields;
}

const Service = ({ page, coaches, review }: Props) => {
  const servicesPageProps = {
    page,
    coaches,
    review,
    pageContent: page?.pageContent,
  };
  return <ServicesPage {...servicesPageProps} />;
};

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const slug = context?.params?.slug as string;
  const servicesPageData = await fetchAPI(servicePageQuery(slug), {});
  const featuredReviewData = await fetchAPI(featuredReview, {});
  console.log({ servicesPageData });

  if (servicesPageData?.servicePageCollection?.items.length <= 0) {
    return {
      notFound: true,
    };
  }

  //   const page = servicesPageData?.data?.page as IPageFields;
  const page = servicesPageData?.data.servicePageCollection?.items?.find(
    ({ slugText }: { slugText: string }) => slugText === slug
  ) as IServicePageFields;

  const review = featuredReviewData?.data?.reviewCollection
    ?.items[0] as IReviewFields;

  context.res.setHeader(
    'Cache-Control',
    'public, s-maxage=864000, stale-while-revalidate=59'
  );

  return {
    props: {
      page,
      coaches: page?.coach ? [page?.coach] : [],
      review,
    },
  };
};

export default Service;
