import FadeInContainer from 'layouts/FadeInContainer';
import SiteHead from 'components/shared/SiteHead';
import HomeBanner from 'components/organisms/home/Banner';
import Container from 'layouts/Container';
import { ICoachFields, IHomePageFields } from 'types/contentful';
import { useMemo } from 'react';
import { memo } from 'react';
interface Props {
  page: IHomePageFields;
  coaches: ICoachFields[];
}

import dynamic from 'next/dynamic';

const FeaturedMessage = dynamic(
  () => import('components/organisms/home/FeaturedMessage'),
);
const CarouselCTA = dynamic(() => import('components/molecules/CarouselCTA'));
const WidgetWrapper = dynamic(
  () => import('components/organisms/home/WidgetWrapper'),
);

const HomePage = ({ page, coaches }: Props) => {
  const ButtonContent = memo(function ButtonContent() {
    return (
      <>
        <p className="text-white font-serif italic font-bold text-center text-3xl">
          Take the first step
        </p>
        <p className="font-bold mb-0 text-base text-center">
          Get your first 1 hour session today!
        </p>
      </>
    );
  });
  const widgets = useMemo(
    () => [
      {
        title: page?.widgetOneTitle,
        imageUrl: page?.widgetOneImage?.url,
        description: page?.widgetOneMessage,
      },
      {
        title: page?.widgetTwoTitle,
        imageUrl: page?.widgetTwoImage?.url,
        description: page?.widgetTwoMessage,
      },
      {
        title: page?.widgetThreeTitle,
        imageUrl: page?.widgetThreeImage?.url,
        description: page?.widgetThreeMessage,
      },
      {
        title: page?.widgetFourTitle,
        imageUrl: page?.widgetFourImage?.url,
        description: page?.widgetFourMessage,
      },
    ],
    [page],
  );
  return (
    <FadeInContainer>
      <SiteHead
        title={page?.seoTitle}
        metaDescription={page?.seoMetaDescription}
      />
      <main>
        <HomeBanner
          imageUrl={page?.banner?.url}
          lineOne={page?.mainBannerText}
          lineTwo={page?.subBannerText}
        />
        <Container>
          <FeaturedMessage
            imageUrl={page?.featuredImage?.url}
            header={page?.featuredMessageHeader}
            body={page?.featuredMessageBody}
          />
        </Container>
        <CarouselCTA
          ButtonContent={ButtonContent}
          buttonLink="/coach/jessica-rebelo"
        />

        <Container>
          <WidgetWrapper widgets={widgets} />
        </Container>
      </main>
    </FadeInContainer>
  );
};

export default HomePage;
