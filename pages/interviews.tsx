import { ISimplePageFields } from 'types/contentful';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { fetchContenfulAPI } from 'utils/api';
import { simplePageQuery } from 'utils/queries';

import InterviewsPage from 'components/pages/InterviewsPage';
import { INTERVIEWS_PAGE_ID } from 'utils/constants';

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
  const interviewsPageData = await fetchContenfulAPI(
    simplePageQuery(INTERVIEWS_PAGE_ID),
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
