import ReviewsPage from 'components/pages/ReviewsPage';
import { GetServerSideProps } from 'next';
import React from 'react';
import { Review, IFeaturedReview } from 'types/Review';
import { Seo } from 'types/SEO';
import { reviewsPageQuery, reviewsQuery } from 'utils/api';
import { formatReview } from 'utils/helpers';

interface Props {
  featuredReview: IFeaturedReview;
  page: {
    seo: Seo;
    bannerImage?: string;
    title: string;
  };
  allReviews: Review[];
}

const Reviews = ({ featuredReview, page, allReviews }: Props) => {
  const pageProps = { featuredReview, page, allReviews };
  return <ReviewsPage {...pageProps} />;
};

export const getServerSideProps: GetServerSideProps = async () => {
  const reviews = await reviewsQuery();
  const pageContent = await reviewsPageQuery();
  const featuredReview = formatReview(reviews);

  const allReviews = reviews.map(({ node }: { node: any }) => ({
    featured: node.featured,
    name: node.name,
    quote: node.quote,
  }));

  const page = pageContent.map(({ node }: { node: any }) => ({
    seo: {
      title: node.seo_title[0].text,
      metaDescription: node.seo_meta_description[0].text,
    },
    title: node.page_title[0].text,
    bannerImage: node.banner_image.url,
  }));

  return {
    props: {
      page: page[0],
      allReviews,
      featuredReview: featuredReview ? featuredReview : null,
    },
  };
};

export default Reviews;
