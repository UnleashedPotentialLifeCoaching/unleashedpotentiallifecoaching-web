import dynamic from 'next/dynamic';
import SiteHead from 'components/shared/SiteHead';
import Container from 'layouts/Container';
import FadeInContainer from 'layouts/FadeInContainer';
import PageBanner from 'components/shared/PageBanner';
import { Review } from 'types/Review';
import { Seo } from 'types/SEO';

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
  featuredReview: Review;
  page: {
    seo: Seo;
    bannerImage?: string;
    title: string;
  };
  allReviews: Review[];
}

const ReviewsPage = ({ featuredReview, page, allReviews }: Props) => {
  const { seo, title, bannerImage } = page;

  return (
    <FadeInContainer>
      <SiteHead {...seo} />
      <PageBanner title={title} bannerImage={bannerImage} />
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
      <FeaturedReview {...featuredReview} />
    </FadeInContainer>
  );
};

export default ReviewsPage;
