import dynamic from 'next/dynamic';
import FadeInContainer from 'layouts/FadeInContainer';
import SiteHead from 'components/shared/SiteHead';
import HomeBanner from 'components/organisms/home/Banner';
import FeaturedMessage from 'components/organisms/home/FeaturedMessage';
import WidgetWrapper from 'components/organisms/home/WidgetWrapper';
import Coaches from 'components/organisms/home/Coaches';
import Container from 'layouts/Container';
import { Coach } from 'types/Coach';
import { Banner, BlockWidget, FeaturedContent } from 'types/Home';
import { Review } from 'types/Review';
import { Seo } from 'types/SEO';

const FeaturedReview = dynamic(
  () => import('components/shared/FeaturedReview')
);

interface Props {
  banner: Banner;
  featuredContent: FeaturedContent;
  blockWidgets: BlockWidget[];
  seo: Seo;
  coaches: Coach[];
  featuredReview: Review;
}

const HomePage = ({
  banner,
  featuredContent,
  blockWidgets,
  seo,
  coaches,
  featuredReview,
}: Props) => (
  <FadeInContainer>
    <SiteHead {...seo} />
    <main>
      <HomeBanner {...banner} />
      <Container>
        <FeaturedMessage {...featuredContent} />
      </Container>
      <Coaches coaches={coaches} />
      <Container>
        <WidgetWrapper widgets={blockWidgets} />
      </Container>
      <FeaturedReview {...featuredReview} />
    </main>
  </FadeInContainer>
);

export default HomePage;
