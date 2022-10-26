import { IHomePageFields, ICoachFields, IReviewFields } from 'types/contentful';
import HomePage from 'components/pages/HomePage';
import {
  GetServerSideProps,
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from 'next';
import { fetchAPI } from 'utils/api';

const homePageQuery = `
  query homePageEntryQuery {
    homePage(id: "6zvqa8rW0XXjmN5iYlUQ1V") {
      # add the fields you want to query
      seoTitle
      seoMetaDescription
      banner {
        url
      }
      mainBannerText
      subBannerText
      featuredImage {
        url
      }
      featuredMessageBody
      featuredMessageHeader
      widgetOneTitle
      widgetOneImage {
        url
      }
      widgetOneMessage
      widgetTwoTitle
      widgetTwoImage {
        url
      }
      widgetTwoMessage
      widgetThreeTitle
      widgetThreeImage {
        url
      }
      widgetThreeMessage
      widgetFourMessage
      widgetFourTitle
      widgetFourImage {
        url
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
      }
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

interface Props {
  page: IHomePageFields;
  coaches: ICoachFields[];
  review: IReviewFields;
}

const Home = ({
  page,
  coaches,
  review,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const homePageProps = { page, coaches, review };

  return <HomePage {...homePageProps} />;
};

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const homePageData = await fetchAPI(homePageQuery, {});
  const coachesData = await fetchAPI(coachesQuery, {});
  const featuredReviewData = await fetchAPI(featuredReview, {});

  const page = homePageData?.data?.homePage as IHomePageFields;
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

export default Home;
