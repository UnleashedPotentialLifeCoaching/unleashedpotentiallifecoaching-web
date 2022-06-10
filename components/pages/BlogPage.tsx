import dynamic from 'next/dynamic';
import FadeInContainer from 'layouts/FadeInContainer';
import Container from 'layouts/Container';
import PageBanner from 'components/shared/PageBanner';
import SiteHead from 'components/shared/SiteHead';
import { BANNER_URL } from 'utils/constants';
import { VIDEO_PROPS, PAGE } from 'types/Podcast';
import { Review } from 'types/Review';
const FeaturedReview = dynamic(
  () => import('components/shared/FeaturedReview')
);

interface Props {
  featuredReview: Review;
}
const PodcastPage = ({ featuredReview }: Props) => (
  <FadeInContainer>
    <PageBanner
      title="Blog"
      bannerImage={page?.banner_image || BANNER_URL}
    />
    <Container>
      <main className="flex flex-col text-center justify-center items-center">
        {videos.length > 0 &&
          videos.map(({ url, title, description }: VIDEO_PROPS) => (
            <Video
              url={url}
              title={title}
              description={description}
              key={title}
            />
          ))}
      </main>
    </Container>
    <FeaturedReview {...featuredReview} />
  </FadeInContainer>
);

export default PodcastPage;
