import dynamic from 'next/dynamic';
import Container from 'layouts/Container';
import { ISimplePageFields } from 'types/contentful';
import { useQuery } from 'react-query';
import { useEffect, useState } from 'react';
import { fetchAPI } from 'utils/api';
import { podcastPageQuery } from 'utils/queries';
import PostsLayout from 'layouts/PostsLayout';
const Video = dynamic(() => import('components/organisms/podcast/Video'));

interface Props {
  page: ISimplePageFields;
}

interface PodCasts {
  podcastsCollection: {
    total: number;
    items: {
      isVideoLink: boolean;
      title: string;
      excerpt: string;
      link: string;
    }[];
  };
}

function useGetPodcasts(variables: any) {
  return useQuery<PodCasts>(
    ['podcasts', variables],
    async () => {
      const request = await fetchAPI(podcastPageQuery, variables);
      return request?.data;
    },
    { keepPreviousData: true },
  );
}

const InterviewsPage = ({ page }: Props) => {
  const [variables, setVariables] = useState({
    limit: 4,
  });
  const [disableBtn, setDisableBtn] = useState(false);

  const { isLoading, data } = useGetPodcasts(variables);

  const handleAmountChange = () => {
    if (data?.podcastsCollection?.total !== variables?.limit) {
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
    if (data?.podcastsCollection?.total > 4) {
      setDisableBtn(false);
    }
    // @ts-ignore
  }, [data?.podcastsCollection?.total]);

  return (
    <PostsLayout page={page}>
      <Container>
        <main className="flex flex-col items-center justify-center">
          {/** @ts-ignore */}
          {data?.podcastsCollection?.items.map((podcast: any) =>
            podcast?.isAVideoLink ? (
              <Video
                url={podcast?.link}
                title={podcast?.title}
                description={podcast?.excerpt}
                key={podcast?.title}
              />
            ) : (
              <a
                key={podcast?.title}
                href={podcast?.link}
                target="_blank"
                rel="noreferrer"
              >
                {podcast?.title}
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
