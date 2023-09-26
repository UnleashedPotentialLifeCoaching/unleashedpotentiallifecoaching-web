import { IReviewFields, ISimplePageFields } from 'types/contentful';
import BlogPage from 'components/pages/BlogPage';
import {
  GetServerSideProps,
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from 'next';
import { QueryClient, QueryClientProvider } from 'react-query';
import { fetchAPI } from 'utils/api';
import { blogPageQuery, featuredReview } from 'utils/queries';

const queryClient = new QueryClient();

const Blog = ({
  page,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const blogPageProps = { page };

  return (
    <QueryClientProvider client={queryClient}>
      <BlogPage {...blogPageProps} />
    </QueryClientProvider>
  );
};

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  const blogPageData = await fetchAPI(blogPageQuery, {});
  const featuredReviewData = await fetchAPI(featuredReview, {});
  const page = blogPageData?.data?.simplePage as ISimplePageFields;
  const review = featuredReviewData?.data?.reviewCollection
    ?.items[0] as IReviewFields;

  context.res.setHeader(
    'Cache-Control',
    'public, s-maxage=300, stale-while-revalidate=59',
  );

  return {
    props: {
      page,
      review,
    },
  };
};

export default Blog;
