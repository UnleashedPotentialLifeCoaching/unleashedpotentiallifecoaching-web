import { ISimplePageFields } from 'types/contentful';
import BlogPage from 'components/pages/BlogPage';
import {
  GetServerSideProps,
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from 'next';
import { QueryClient, QueryClientProvider } from 'react-query';
import { fetchAPI } from 'utils/api';
import { simplePageQuery } from 'utils/queries';
import { BLOG_PAGE_ID } from 'utils/constants';

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
  const blogPageData = await fetchAPI(simplePageQuery(BLOG_PAGE_ID), {});
  const page = blogPageData?.data?.simplePage as ISimplePageFields;

  context.res.setHeader(
    'Cache-Control',
    'public, s-maxage=300, stale-while-revalidate=59',
  );

  return {
    props: {
      page,
    },
  };
};

export default Blog;
