import FadeInContainer from 'layouts/FadeInContainer';
import SiteHead from 'components/shared/SiteHead';
import HomeBanner from 'components/organisms/home/Banner';
import FeaturedMessage from 'components/organisms/home/FeaturedMessage';
import WidgetWrapper from 'components/organisms/home/WidgetWrapper';
import Coaches from 'components/organisms/home/Coaches';
import Container from 'layouts/Container';
import { ICoachFields, IHomePageFields } from 'types/contentful';
import Link from 'next/link';
import { useMemo } from 'react';
import CarouselCTA from 'components/shared/CarouselCTA';
import AnimatedButton from 'components/atoms/AnimatedButton';

interface Props {
  page: IHomePageFields;
  coaches: ICoachFields[];
}
let V1_COACHES = false;

const HomePage = ({ page, coaches }: Props) => {
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
        {V1_COACHES ? (
          <Coaches coaches={coaches} />
        ) : (
          <>
            <div className="relative z-10 flex justify-center inline-block inset-y-56">
              <AnimatedButton>
                <Link href="/coach/jessica-rebelo">
                  <p className="text-white font-serif italic font-bold text-center text-3xl">
                    Take the first step
                  </p>
                  <p className="font-bold mb-0 text-base text-center">
                    Get your first 1 hour session today!
                  </p>
                </Link>
              </AnimatedButton>
            </div>
            <CarouselCTA />
          </>
        )}

        <Container>
          <WidgetWrapper widgets={widgets} />
        </Container>
      </main>
    </FadeInContainer>
  );
};

export default HomePage;
