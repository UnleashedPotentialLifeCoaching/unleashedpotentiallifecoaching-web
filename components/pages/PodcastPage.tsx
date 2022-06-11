import dynamic from 'next/dynamic';
import FadeInContainer from 'layouts/FadeInContainer';
import Container from 'layouts/Container';
import PageBanner from 'components/shared/PageBanner';
import SiteHead from 'components/shared/SiteHead';
import { BANNER_URL } from 'utils/constants';
import { VIDEO_PROPS, PAGE } from 'types/Podcast';
import { IFeaturedReview } from 'types/Review';

const Video = dynamic(() => import('components/organisms/podcast/Video'));
const FeaturedReview = dynamic(
  () => import('components/shared/FeaturedReview')
);

interface Props {
  videos: VIDEO_PROPS[];
  page: PAGE;
  featuredReview: IFeaturedReview;
}
const PodcastPage = ({ videos, page, featuredReview }: Props) => (
  <FadeInContainer>
    <SiteHead {...page?.seo} />
    <PageBanner
      title="Podcast"
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
