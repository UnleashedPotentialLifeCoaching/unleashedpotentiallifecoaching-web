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

interface Props {
  videos: any;
  page: ISimplePageFields;
  review: IReviewFields;
  message: string;
  hasNextPage: boolean | undefined;
  isFetchingNextPage: boolean;
  handleAmountChange: () => void;
}
const PodcastPage = ({
  videos,
  page,
  review,
  message,
  hasNextPage,
  isFetchingNextPage,
  handleAmountChange,
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
          videos?.map(({ snippet, id }: any) => (
            <Video
              url={`https://www.youtube.com/embed/${id?.videoId}`}
              title={snippet?.title}
              description={snippet?.description}
              key={snippet?.title}
            />
          ))}
      </main>
    </Container>
    <div className="flex flex-row justify-center w-full mb-8">
      <button
        onClick={() => handleAmountChange()}
        disabled={!hasNextPage || isFetchingNextPage}
        className={` ${
          Boolean(!hasNextPage || isFetchingNextPage) ? 'opacity-25' : ''
        } mb-4 sm:mb-0 font-bold w-full sm:w-2/4 text-center py-3 rounded bg-forrest text-white text-2xl`}
      >
        {message}
      </button>
    </div>
    <FeaturedReview name={review?.name} quote={review?.quote} />
  </FadeInContainer>
);

export default PodcastPage;
