import { ISimplePageFields } from 'types/contentful';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { fetchContenfulAPI } from 'utils/api';
import { simplePageQuery } from 'utils/queries';
import { siteConstants } from 'pages/api/site-constants';

import InterviewsPage from 'components/pages/InterviewsPage';
import { IPageIds } from 'utils/types';

const queryClient = new QueryClient();

const Interviews = ({
  page,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const interviewsPageProps = { page };
  return (
    <QueryClientProvider client={queryClient}>
      <InterviewsPage {...interviewsPageProps} />
    </QueryClientProvider>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const constants = await siteConstants();
  const pageId = constants.page_ids
    .filter((p: IPageIds) => p.page === 'interviews')
    .map((p: IPageIds) => p.id)[0];
  const interviewsPageData = await fetchContenfulAPI(
    simplePageQuery(pageId),
    {},
  );
  const page = interviewsPageData?.data?.simplePage as ISimplePageFields;

  return {
    props: {
      page,
    },
  };
};

export default Interviews;
