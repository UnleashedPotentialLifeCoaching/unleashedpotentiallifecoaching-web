import Container from 'layouts/Container';
import { ISimplePageFields } from 'types/contentful';
import { useEffect, useState } from 'react';
import { useGetPosts } from 'utils/api';
import { interviewCollectionQuery } from 'utils/queries';
import PostsLayout from 'layouts/SimplePageLayout';

interface Props {
  page: ISimplePageFields;
}

const InterviewsPage = ({ page }: Props) => {
  const [variables, setVariables] = useState({
    limit: 4,
  });
  const [disableBtn, setDisableBtn] = useState(false);

  const { isLoading, data } = useGetPosts(
    'interviews',
    interviewCollectionQuery,
    variables,
  );

  const handleAmountChange = () => {
    if (data?.interviewsCollection?.total !== variables?.limit) {
      let updateLimit = variables?.limit + 1;
      setVariables({
        limit: updateLimit,
      });
    } else {
      setDisableBtn(true);
    }
  };

  useEffect(() => {
    // @ts-ignore
    if (data?.interviewsCollection?.total > 4) {
      setDisableBtn(false);
    }
    // @ts-ignore
  }, [data?.interviewsCollection?.total]);

  return (
    <PostsLayout page={page}>
      <Container>
        <main className="flex flex-col items-center justify-center">
          {/** @ts-ignore */}
          {data?.interviewsCollection?.items.map(
            (interview: any) =>
              interview?.isOutsideLink && (
                <a
                  key={interview.title}
                  href={interview?.link}
                  target="_blank"
                  rel="noreferrer"
                >
                  {interview?.title}
                </a>
              ),
          )}
        </main>
      </Container>
      <div className="flex flex-row justify-center w-full mb-8">
        <button
          onClick={() => handleAmountChange()}
          disabled={disableBtn || isLoading}
          className={` ${
            Boolean(disableBtn || isLoading) ? 'opacity-25' : ''
          } mb-4 sm:mb-0 font-bold w-full sm:w-2/4 text-center py-3 rounded bg-forrest text-white text-2xl`}
        >
          Load More
        </button>
      </div>
    </PostsLayout>
  );
};

export default InterviewsPage;
