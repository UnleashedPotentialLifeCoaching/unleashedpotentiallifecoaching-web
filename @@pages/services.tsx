import { ICoachFields, IReviewFields, IPageFields } from 'types/contentful';
import ServicesPage from 'components/pages/ServicesPage';
import {
  GetServerSideProps,
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from 'next';
import { fetchAPI } from 'utils/api';

const servicesPageQuery = `
  query pageEntryQuery {
  page(id: "crBLtmzvD0gln6LAC3NEV") {
    pageTitle
    seoTitle
    seoMetaDescription
    banner{
      url
    }
    pageContent {
      json
      links {
        assets {
          block {
             sys {
                  id
                }
                url
                title
                width
                height
                description
                contentType      
          }
        }
      }
    }
  }
}
`;

const coachesQuery = `query coachCollectionQuery {
  coachCollection {
    items {
      name
      appearanceOrder
      bookTimePhoto {
        url
        width
        height
      }
    }
  }
}`;

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

const Services = ({
  page,
  coaches,
  review,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
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
  const servicesPageData = await fetchAPI(servicesPageQuery, {});
  const coachesData = await fetchAPI(coachesQuery, {});
  const featuredReviewData = await fetchAPI(featuredReview, {});

  const page = servicesPageData?.data?.page as IPageFields;
  const coaches = coachesData?.data?.coachCollection?.items as ICoachFields[];
  const review = featuredReviewData?.data?.reviewCollection
    ?.items[0] as IReviewFields;

  context.res.setHeader(
    'Cache-Control',
    'public, s-maxage=300, stale-while-revalidate=59'
  );

  return {
    props: {
      page,
      coaches,
      review,
    },
  };
};

export default Services;
