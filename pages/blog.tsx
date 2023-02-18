import { IReviewFields, ISimplePageFields } from 'types/contentful';
import BlogPage from 'components/pages/BlogPage';
import {
  GetServerSideProps,
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from 'next';
import { QueryClient, QueryClientProvider } from 'react-query';
import { fetchAPI } from 'utils/api';

const blogPageQuery = `
  query simplePageEntryQuery {
  simplePage(id: "6zowWUPrZmyZ0HjQXBnoye") {
    pageTitle
    seoTitle
    seoMetaDescription
    banner {
      url
    }
  }
}
`;

const featuredReview = `query reviewCollectionQuery {
  reviewCollection(
    limit: 1,
    where:{
    featuredReview: true
  }) {
    items {
      name
      quote{
        json
      }
    }
  }
}`;

const queryClient = new QueryClient();

const Blog = ({
  page,
  review,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const blogPageProps = { page, review };

  return (
    <QueryClientProvider client={queryClient}>
      <BlogPage {...blogPageProps} />
    </QueryClientProvider>
  );
};

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const blogPageData = await fetchAPI(blogPageQuery, {});
  const featuredReviewData = await fetchAPI(featuredReview, {});
  const page = blogPageData?.data?.simplePage as ISimplePageFields;
  const review = featuredReviewData?.data?.reviewCollection
    ?.items[0] as IReviewFields;

  context.res.setHeader(
    'Cache-Control',
    'public, s-maxage=300, stale-while-revalidate=59'
  );

  return {
    props: {
      page,
      review,
    },
  };
};

export default Blog;
