import ProfileHeader from 'components/organisms/coach/ProfileHeader';
import SiteHead from 'components/shared/SiteHead';
import Container from 'layouts/Container';
import FadeInContainer from 'layouts/FadeInContainer';
import dynamic from 'next/dynamic';
import React from 'react';
import { ICoachFields, IReviewFields } from 'types/contentful';
import { SEO_DEFAULTS } from 'utils/constants';
const Biography = dynamic(() => import('components/organisms/coach/Biography'));

interface Props {
  coach: ICoachFields;
}

const CoachPage = ({ coach }: Props) => {
  const {
    name,
    profileImage,
    welcomeMessage,
    biography,
    seoTitle,
    seoMetaDescription,
  } = coach;

  return (
    <FadeInContainer>
      <SiteHead
        title={seoTitle || SEO_DEFAULTS.title}
        metaDescription={seoMetaDescription || SEO_DEFAULTS.metaDescription}
      />
      <main>
        <Container>
          <ProfileHeader
            name={name as string}
            profileImage={profileImage}
            welcomeMessage={welcomeMessage}
          />
          <br />
          <Biography biography={biography} />
        </Container>
      </main>
    </FadeInContainer>
  );
};

export default CoachPage;
