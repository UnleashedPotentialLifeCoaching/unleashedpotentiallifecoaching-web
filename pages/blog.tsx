import { ISimplePageFields } from 'types/contentful';
import BlogPage from 'components/pages/BlogPage';
import {
  GetServerSideProps,
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from 'next';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { fetchAPI } from 'utils/api';
import { simplePageQuery } from 'utils/queries';
import { BLOG_PAGE_ID, CACHE_CONTROL, CACHE_LIFE } from 'utils/constants';

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

  context.res.setHeader(CACHE_CONTROL, CACHE_LIFE);

  return {
    props: {
      page,
    },
  };
};

export default Blog;
