import dynamic from 'next/dynamic';
import Container from 'layouts/Container';
import { ISimplePageFields } from 'types/contentful';
import { useEffect, useState } from 'react';
import { useGetPosts } from 'utils/api';
import { podcastPageQuery } from 'utils/queries';
import SimplePageLayout from 'layouts/SimplePageLayout';
import usePagination from 'hooks/usePagination';
const Video = dynamic(() => import('components/organisms/podcast/Video'));

interface Props {
  page: ISimplePageFields;
}

const PodcastPage = ({ page }: Props) => {
  const [limit, setLimit] = useState(4);
  const { isLoading, data } = useGetPosts('podcasts', podcastPageQuery, {
    limit,
  });

  const [disableBtn, handleAmountChange] = usePagination(
    data?.podcastsCollection?.total,
    limit,
    setLimit,
  );

  return (
    <SimplePageLayout page={page}>
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
                className="flex flex-col my-16 max-w-md border p-6 rounded"
              >
                <h3 className="text-2xl text-forrest mb-2 block">
                  {podcast?.title}
                </h3>
                <p>{podcast?.excerpt}</p>
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
    </SimplePageLayout>
  );
};

export default PodcastPage;
