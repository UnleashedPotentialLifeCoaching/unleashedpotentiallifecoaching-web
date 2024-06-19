import BasicPage from 'components/organisms/coach/BasicPage';
import CarouselPage from 'components/organisms/coach/CarouselPage';
import SiteHead from 'components/shared/SiteHead';
import { ConstantsContext } from 'contexts/ConstantsContext';
import Container from 'layouts/Container';
import FadeInContainer from 'layouts/FadeInContainer';
import React, { useContext, useEffect, useState } from 'react';
import { ICoachFields } from 'types/contentful';
import { CAROUSEL_COACHES_LIST } from 'utils/constants';

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
  const [isCarouselPage, setCarouselPage] = useState<boolean>(false);

  useEffect(() => {
    if (CAROUSEL_COACHES_LIST.includes(name as string)) {
      setCarouselPage(true);
    }
  }, [name, setCarouselPage]);

  return (
    <FadeInContainer>
      <SiteHead
        title={seoTitle || seo_defaults.title}
        metaDescription={seoMetaDescription || seo_defaults.metaDescription}
      />
      <main>
        <Container>
          {isCarouselPage ? (
            <CarouselPage
              name={name as string}
              profileImage={profileImage}
              welcomeMessage={welcomeMessage}
              biography={biography}
            />
          ) : (
            <BasicPage
              name={name as string}
              profileImage={profileImage}
              welcomeMessage={welcomeMessage}
              biography={biography}
            />
          )}
        </Container>
      </main>
    </FadeInContainer>
  );
};

export default CoachPage;
