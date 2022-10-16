import dynamic from 'next/dynamic';
import SiteHead from 'components/shared/SiteHead';
import Container from 'layouts/Container';
import FadeInContainer from 'layouts/FadeInContainer';
import PageBanner from 'components/shared/PageBanner';
import { IFeaturedReview, Review } from 'types/Review';
import { Seo } from 'types/SEO';
import { IReviewFields, ISimplePageFields } from 'types/contentful';
import { SEO_DEFAULTS } from 'utils/constants';

const FeaturedReview = dynamic(
  () => import('components/shared/FeaturedReview')
);

const ReviewBlock = dynamic(
  () => import('components/organisms/reviews/ReviewBlock')
);
const ReviewForm = dynamic(
  () => import('components/organisms/reviews/ReviewForm')
);

interface Props {
  review: IReviewFields;
  allReviews: IReviewFields[];
  page: ISimplePageFields;
}

const ReviewsPage = ({ review, page, allReviews }: Props) => {
  return (
    <FadeInContainer>
      <SiteHead
        title={page?.seoTitle || SEO_DEFAULTS.title}
        metaDescription={
          page?.seoMetaDescription || SEO_DEFAULTS.metaDescription
        }
      />
      <PageBanner
        title={page?.pageTitle as string}
        bannerImage={page?.banner?.url}
      />
      <main>
        <Container>
          <div className="lg:grid lg:grid-cols-2 lg:grid-flow-col lg:gap-4">
            <div>
              {allReviews.map((review) => (
                <ReviewBlock {...review} key={review.name[0].text} />
              ))}
            </div>
            <div>
              <ReviewForm />
            </div>
          </div>
        </Container>
      </main>
      <FeaturedReview name={review?.name} quote={review?.quote} />
    </FadeInContainer>
  );
};

export default ReviewsPage;
