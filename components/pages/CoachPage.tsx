import ProfileHeader from 'components/organisms/coach/ProfileHeader';
import SiteHead from 'components/shared/SiteHead';
import Container from 'layouts/Container';
import FadeInContainer from 'layouts/FadeInContainer';
import dynamic from 'next/dynamic';
import React from 'react';
import { Coach } from 'types/Coach';
import { Review } from 'types/Review';
import { SEO_DEFAULTS } from 'utils/constants';

const FeaturedReview = dynamic(
  () => import('components/shared/FeaturedReview')
);
const Biography = dynamic(() => import('components/organisms/coach/Biography'));

interface Props {
  coach: Coach;
  featuredReview: Review;
}

const CoachPage = ({ coach, featuredReview }: Props) => {
  const { name, image, welcomeMessage, biography, seo } = coach;
  const seoTitle = seo?.title ? seo.title : SEO_DEFAULTS.title;
  const seoMetaDescription = seo?.metaDescription
    ? seo.metaDescription
    : SEO_DEFAULTS.metaDescription;

  return (
    <FadeInContainer>
      <SiteHead title={seoTitle} metaDescription={seoMetaDescription} />
      <main>
        <Container>
          <ProfileHeader
            name={name}
            image={image}
            welcomeMessage={welcomeMessage}
          />
          <br />
          <Biography biography={biography} />
        </Container>
      </main>
      <FeaturedReview {...featuredReview} />
    </FadeInContainer>
  );
};

export default CoachPage;
