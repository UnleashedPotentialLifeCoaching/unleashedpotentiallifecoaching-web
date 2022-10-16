import dynamic from 'next/dynamic';
import FadeInContainer from 'layouts/FadeInContainer';
import Container from 'layouts/Container';
import PageBanner from 'components/shared/PageBanner';
import SiteHead from 'components/shared/SiteHead';
import { BANNER_URL } from 'utils/constants';
import ButtonGroup from 'components/organisms/podcast/ButtonGroup';
import { IReviewFields, ISimplePageFields } from 'types/contentful';

const Video = dynamic(() => import('components/organisms/podcast/Video'));
const FeaturedReview = dynamic(
  () => import('components/shared/FeaturedReview')
);

interface VIDEO_PROPS {
  description: string;
  title: string;
  url: string;
}

interface Props {
  videos: VIDEO_PROPS[];
  page: ISimplePageFields;
  review: IReviewFields;
  setTriggerNextPage: (e: boolean) => void;
  nextPageToken: string;
}
const PodcastPage = ({
  videos,
  page,
  review,
  setTriggerNextPage,
  nextPageToken,
}: Props) => (
  <FadeInContainer>
    <SiteHead
      title={page?.seoTitle}
      metaDescription={page?.seoMetaDescription}
    />
    <PageBanner
      title={page?.pageTitle as string}
      bannerImage={page?.banner?.url || BANNER_URL}
    />
    <Container>
      <main className="flex flex-col items-center justify-center">
        {videos?.length > 0 &&
          videos.map(({ snippet, id }: any) => (
            <Video
              url={`https://www.youtube.com/embed/${id?.videoId}`}
              title={snippet?.title}
              description={snippet?.description}
              key={snippet?.title}
            />
          ))}
      </main>
      <ButtonGroup
        setTriggerNextPage={setTriggerNextPage}
        nextPageToken={nextPageToken}
      />
    </Container>
    <FeaturedReview name={review?.name} quote={review?.quote} />
  </FadeInContainer>
);

export default PodcastPage;
