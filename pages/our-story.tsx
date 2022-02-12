import OurStoryPage from 'components/pages/OurStoryPage';
import { GetServerSideProps } from 'next';
import React from 'react';
import { TOurStory } from 'types/OurStory';
import { Review } from 'types/Review';
import { ourStoryQuery, reviewsQuery } from 'utils/api';
import { formatReview } from 'utils/helpers';

interface Props {
  featuredReview: Review;
  page: TOurStory;
}

const OurStory = ({ featuredReview, page }: Props) => {
  return <OurStoryPage {...page} featuredReview={featuredReview} />;
};

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const reviews = await reviewsQuery();
  const request = await ourStoryQuery();
  const featuredReview = formatReview(reviews);

  const formatPage = request.map(({ node }: { node: any }) => ({
    seo: {
      title: node.seo_title[0].text,
      metaDescription: node.seo_meta_description[0].text,
    },
    title: node.title[0].text,
    pageContent: node.page_content,
    banner_image: node.banner_image.url,
  }));

  /** Caching headers */
  res.setHeader(
    'Cache-Control',
    'public, s-maxage=86400, stale-while-revalidate=59'
  );
  return {
    props: {
      featuredReview,
      page: formatPage[0],
    },
  };
};
export default OurStory;
