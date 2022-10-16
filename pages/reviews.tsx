import ReviewsPage from 'components/pages/ReviewsPage';
import { GetServerSideProps } from 'next';
import React from 'react';
import { IReviewFields, ISimplePageFields } from 'types/contentful';
import { fetchAPI } from 'utils/api';

const reviewsQuery = `
query reviewCollectionQuery {
  reviewCollection {
    items {
      name
      quote {
        json
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

const reviewPageQuery = `query simplePageEntryQuery {
  simplePage(id: "7M8IWPzBF60jrl0SiHgUsW") {
    pageTitle
    seoTitle
    seoMetaDescription
    banner {
      url
    }
  }
}`;

interface Props {
  review: IReviewFields;
  page: ISimplePageFields;
  allReviews: IReviewFields[];
}

const Reviews = ({ review, page, allReviews }: Props) => {
  const pageProps = { review, page, allReviews };
  return <ReviewsPage {...pageProps} />;
};

export const getServerSideProps: GetServerSideProps = async () => {
  const reviewsData = await fetchAPI(reviewsQuery, {});
  const featuredReviewData = await fetchAPI(featuredReview, {});
  const reviewPageData = await fetchAPI(reviewPageQuery, {});

  const allReviews = reviewsData?.data?.reviewCollection
    ?.items as IReviewFields[];
  const review = featuredReviewData?.data?.reviewCollection
    ?.items[0] as IReviewFields;
  const page = reviewPageData?.data?.simplePage;

  return {
    props: {
      page,
      review,
      allReviews,
    },
  };
};

export default Reviews;
