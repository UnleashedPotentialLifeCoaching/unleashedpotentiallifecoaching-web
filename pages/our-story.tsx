import OurStoryPage from 'components/pages/OurStoryPage';
import { GetServerSideProps } from 'next';
import React from 'react';
import { TOurStory } from 'types/OurStory';
import { IFeaturedReview } from 'types/Review';
import { ourStoryQuery, reviewsQuery } from 'utils/api';
import { formatReview } from 'utils/helpers';

interface Props {
  featuredReview: IFeaturedReview;
  page: TOurStory;
}

const OurStory = ({ featuredReview, page }: Props) => {
  return <OurStoryPage {...page} featuredReview={featuredReview} />;
};

export const getServerSideProps: GetServerSideProps = async () => {
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

  return {
    props: {
      featuredReview: featuredReview ? featuredReview : null,
      page: formatPage[0],
    },
  };
};
export default OurStory;
