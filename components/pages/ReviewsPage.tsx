import dynamic from 'next/dynamic';
import Container from 'layouts/Container';
import { IReviewFields, ISimplePageFields } from 'types/contentful';
import SimplePageLayout from 'layouts/SimplePageLayout';
import { useVirtualizer } from '@tanstack/react-virtual';
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

  const virtualizer = useVirtualizer({
    count: allReviews.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 100, // Estimate each item to be 100px tall
    overscan: 5, // Number of items to render outside of the visible area
  });

  return (
    <SimplePageLayout page={page}>
      <main>
        <Container>
          <div className="lg:grid lg:grid-cols-2 lg:grid-flow-col lg:gap-4">
            <div
              ref={parentRef}
              className="h-[520px] overflow-auto rounded border p-4"
              style={{
                height: 500,
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
                {virtualizer.getVirtualItems().map((virtualItem) => (
                  <div
                    key={virtualItem.key}
                    style={{
                      width: '100%',
                      height: 350,
                    }}
                  >
                    <ReviewBlock
                      name={allReviews[virtualItem.index].name as string}
                      quote={allReviews[virtualItem.index].quote}
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
