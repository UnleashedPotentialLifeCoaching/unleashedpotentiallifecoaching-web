import { ISimplePageFields } from 'types/contentful';
import BlogPage from 'components/pages/BlogPage';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { fetchContenfulAPI } from 'utils/api';
import { simplePageQuery } from 'utils/queries';
import { siteConstants } from 'pages/api/site-constants';
import { IPageIds } from 'utils/types';

const queryClient = new QueryClient();

const Blog = ({ page }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const blogPageProps = { page };

  return (
    <QueryClientProvider client={queryClient}>
      <BlogPage {...blogPageProps} />
    </QueryClientProvider>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const constants = await siteConstants();
  const pageId = constants.page_ids
    .filter((p: IPageIds) => p.page === 'blog')
    .map((p: IPageIds) => p.id)[0];

  const blogPageData = await fetchContenfulAPI(simplePageQuery(pageId), {});
  const page = blogPageData?.data?.simplePage as ISimplePageFields;

  return {
    props: {
      page,
    },
  };
};

export default Blog;
