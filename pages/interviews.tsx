import { ISimplePageFields } from 'types/contentful';
import {
  GetServerSideProps,
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from 'next';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { fetchAPI } from 'utils/api';
import { simplePageQuery } from 'utils/queries';
import { INTERVIEWS_PAGE_ID } from 'utils/constants';
import InterviewsPage from 'components/pages/InterviewsPage';

const queryClient = new QueryClient();

const Interviews = ({
  page,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const interviewsPageProps = { page };
  return (
    <QueryClientProvider client={queryClient}>
      <InterviewsPage {...interviewsPageProps} />
    </QueryClientProvider>
  );
};

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  const interviewsPageData = await fetchAPI(
    simplePageQuery(INTERVIEWS_PAGE_ID),
    {},
  );
  const page = interviewsPageData?.data?.simplePage as ISimplePageFields;
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

export default Interviews;
