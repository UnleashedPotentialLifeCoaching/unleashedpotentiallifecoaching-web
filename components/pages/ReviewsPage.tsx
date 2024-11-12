import dynamic from 'next/dynamic';
import Container from 'layouts/Container';
import { IReviewFields, ISimplePageFields } from 'types/contentful';
import SimplePageLayout from 'layouts/SimplePageLayout';
import { useRef } from 'react';

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
  const parentRef = useRef<HTMLDivElement>(null);

  return (
    <SimplePageLayout page={page}>
      <main>
        <Container>
          <div className="lg:grid lg:grid-cols-2 lg:grid-flow-col lg:gap-4">
            <div
              ref={parentRef}
              className="overflow-auto rounded border p-2"
              style={{
                height: 820,
                overflow: 'auto',
              }}
            >
              <div
                className=""
                style={{
                  minHeight: `100vh`,
                  width: '100%',
                  position: 'relative',
                  // border: '3px solid red',
                }}
              >
                {allReviews.map((virtualItem) => (
                  <div
                    key={virtualItem.name}
                    className="mb-8"
                    style={{
                      width: '100%',
                      minHeight: 'content',
                      padding: 2,
                    }}
                  >
                    <ReviewBlock
                      name={virtualItem.name as string}
                      quote={virtualItem.quote}
                    />
                  </div>
                ))}
              </div>
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
