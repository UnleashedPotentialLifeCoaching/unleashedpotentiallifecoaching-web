import dynamic from 'next/dynamic';
import FadeInContainer from 'layouts/FadeInContainer';
import Container from 'layouts/Container';
import PageBanner from 'components/shared/PageBanner';
import SiteHead from 'components/shared/SiteHead';
import { BANNER_URL } from 'utils/constants';
import { VIDEO_PROPS, PAGE } from 'types/Podcast';
import { IFeaturedReview } from 'types/Review';
import ButtonGroup from 'components/organisms/podcast/ButtonGroup';

const Video = dynamic(() => import('components/organisms/podcast/Video'));
const FeaturedReview = dynamic(
  () => import('components/shared/FeaturedReview')
);

interface Props {
  videos: VIDEO_PROPS[];
  page: PAGE;
  featuredReview: IFeaturedReview;
  setTriggerNextPage: (e: boolean) => void;
  setTriggerPrevPage: (e: boolean) => void;
  nextPageToken: string;
  prevPageToken: string;
}
const PodcastPage = ({ 
  videos,
  page,
  featuredReview,
  setTriggerNextPage,
  setTriggerPrevPage,
  nextPageToken,
  prevPageToken
 }: Props) => (
  <FadeInContainer>
    <SiteHead {...page?.seo} />
    <PageBanner
      title="Podcast"
      bannerImage={page?.banner_image || BANNER_URL}
    />
    <Container>
      <ButtonGroup
        setTriggerNextPage={setTriggerNextPage}
        setTriggerPrevPage={setTriggerPrevPage}
        nextPageToken={nextPageToken}
        prevPageToken={prevPageToken}
        />
      <main className="flex flex-col sm:flex-row sm:flex-wrap sm:gap-x-8 xl:gap-x-16">
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
      <ButtonGroup
        setTriggerNextPage={setTriggerNextPage}
        setTriggerPrevPage={setTriggerPrevPage}
        nextPageToken={nextPageToken}
        prevPageToken={prevPageToken}
        />
    </Container>
    <FeaturedReview {...featuredReview} />
  </FadeInContainer>
);

export default PodcastPage;
