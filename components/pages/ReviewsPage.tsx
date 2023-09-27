import dynamic from 'next/dynamic';
import Container from 'layouts/Container';
import { IReviewFields, ISimplePageFields } from 'types/contentful';
import SimplePageLayout from 'layouts/SimplePageLayout';
const ReviewBlock = dynamic(
  () => import('components/organisms/reviews/ReviewBlock'),
);
const ReviewForm = dynamic(
  () => import('components/organisms/reviews/ReviewForm'),
);

interface Props {
  allReviews: IReviewFields[];
  page: ISimplePageFields;
}

const ReviewsPage = ({ page, allReviews }: Props) => {
  return (
    <SimplePageLayout page={page}>
      <main>
        <Container>
          <div className="lg:grid lg:grid-cols-2 lg:grid-flow-col lg:gap-4">
            <div>
              {allReviews.map((review) => (
                <ReviewBlock
                  name={review?.name as string}
                  quote={review?.quote}
                  key={review?.name as string}
                />
              ))}
            </div>
            <div>
              <ReviewForm />
            </div>
          </div>
        </Container>
      </main>
    </SimplePageLayout>
  );
};

export default ReviewsPage;
