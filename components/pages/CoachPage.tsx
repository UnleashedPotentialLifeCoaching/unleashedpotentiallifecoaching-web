import ProfileHeader from 'components/organisms/coach/ProfileHeader';
import SiteHead from 'components/shared/SiteHead';
import { ConstantsContext } from 'contexts/ConstantsContext';
import Container from 'layouts/Container';
import FadeInContainer from 'layouts/FadeInContainer';
import dynamic from 'next/dynamic';
import React, { useContext } from 'react';
import { ICoachFields, IReviewFields } from 'types/contentful';
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
  const { seo_defaults } = useContext(ConstantsContext);

  return (
    <FadeInContainer>
      <SiteHead
        title={seoTitle || seo_defaults.title}
        metaDescription={seoMetaDescription || seo_defaults.metaDescription}
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
