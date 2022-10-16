import dynamic from 'next/dynamic';
import FadeInContainer from 'layouts/FadeInContainer';
import SiteHead from 'components/shared/SiteHead';
import HomeBanner from 'components/organisms/home/Banner';
import FeaturedMessage from 'components/organisms/home/FeaturedMessage';
import WidgetWrapper from 'components/organisms/home/WidgetWrapper';
import Coaches from 'components/organisms/home/Coaches';
import Container from 'layouts/Container';
import { ICoachFields, IHomePageFields, IReviewFields } from 'types/contentful';

const FeaturedReview = dynamic(
  () => import('components/shared/FeaturedReview')
);

interface Props {
  page: IHomePageFields;
  coaches: ICoachFields[];
  review: IReviewFields;
}

const HomePage = ({ page, coaches, review }: Props) => (
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
      <Coaches coaches={coaches} />
      <Container>
        <WidgetWrapper
          widgets={[
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
          ]}
        />
      </Container>
      <FeaturedReview name={review?.name} quote={review?.quote} />
    </main>
    {/* <main>
      

      
      <Container>
        <WidgetWrapper widgets={blockWidgets} />
      </Container>
      <FeaturedReview {...featuredReview} />
    </main> */}
  </FadeInContainer>
);

export default HomePage;
