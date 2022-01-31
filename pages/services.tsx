/* eslint-disable react-hooks/exhaustive-deps */
import ServicesPage from 'components/pages/ServicesPage';
import { CoachesContext } from 'contexts/CoachesContext';
import { GetServerSideProps } from 'next';
import React, { useContext, useEffect } from 'react';
import { Coach } from 'types/Coach';
import { Review } from 'types/Review';
import { TServices } from 'types/Services';
import { coachesQuery, reviewsQuery, servicesQuery } from 'utils/api';
import { formatCoaches, formatReview } from 'utils/helpers';

interface Props {
  service: TServices;
  featuredReview: Review;
  coaches: Coach[];
}
const Services = ({ service, featuredReview, coaches }: Props) => {
  const { seo, page_blocks, banner_image } = service;
  const { coaches: contextCoaches, setCoaches } = useContext(CoachesContext);
  useEffect(() => {
    if (!contextCoaches) {
      setCoaches(coaches);
    }
  }, [coaches]);

  return (
    <ServicesPage
      page_blocks={page_blocks}
      seo={seo}
      coaches={coaches}
      featuredReview={featuredReview}
      bannerImage={banner_image}
    />
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const services = await servicesQuery();
  const reviews = await reviewsQuery();
  const coachesRequest = await coachesQuery();

  const page = services.map(({ node }: { node: any }) => ({
    seo: {
      title: node.seo_title[0].text,
      metaDescription: node.seo_meta_description[0].text,
    },
    page_blocks: node.page_content,
    banner_image: node.banner_image.url,
  }));

  const featuredReview = formatReview(reviews);

  const coaches = coachesRequest
    .map(({ node }: { node: any }) => formatCoaches(node))
    .sort((a: any, b: any) => (a.id > b.id ? 1 : -1));

  return {
    props: {
      service: page[0],
      featuredReview,
      coaches,
    },
  };
};

export default Services;
