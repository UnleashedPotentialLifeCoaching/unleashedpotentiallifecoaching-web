import dynamic from 'next/dynamic';
import FadeInContainer from 'layouts/FadeInContainer';
import Container from 'layouts/Container';
import PageBanner from 'components/shared/PageBanner';
import SiteHead from 'components/shared/SiteHead';
import {
  BANNER_URL,
  NEXT_PUBLIC_CONTENTFUL_GRAPHQL_API_URL,
  NEXT_PUBLIC_CONTENTFUL_MANAGEMENT_API_ACCESS_TOKEN,
} from 'utils/constants';
import { IReviewFields, ISimplePageFields } from 'types/contentful';
import { useQuery } from 'react-query';
import { gql, GraphQLClient } from 'graphql-request';
import { useEffect, useState } from 'react';
const Video = dynamic(() => import('components/organisms/podcast/Video'));
const FeaturedReview = dynamic(
  () => import('components/shared/FeaturedReview')
);

const endpoint = NEXT_PUBLIC_CONTENTFUL_GRAPHQL_API_URL;

const graphQLClient = new GraphQLClient(endpoint as string, {
  headers: {
    Authorization: `Bearer ${NEXT_PUBLIC_CONTENTFUL_MANAGEMENT_API_ACCESS_TOKEN}`,
    'Content-Type': 'application/json',
    'User-Agent':
      'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.89 Safari/537.36',
    Accept: 'application/json; charset=UTF-8',
  },
});

interface Props {
  page: ISimplePageFields;
  review: IReviewFields;
}

const podcastPageQuery = gql`
  query Podcasts($limit: Int) {
    podcastsCollection(limit: $limit) {
      total
      items {
        isAVideoLink
        title
        excerpt
        link
      }
    }
  }
`;

function useGetPodcasts(variables: any) {
  return useQuery(
    ['podcasts', variables],
    async () => {
      const data = await graphQLClient.request(podcastPageQuery, variables);
      return data;
    },
    { keepPreviousData: true }
  );
}

const PodcastPage = ({ page, review }: Props) => {
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
    if (data?.podcastsCollection?.total < 4) {
      setDisableBtn(true);
    }
  }, []);

  return (
    <FadeInContainer>
      <SiteHead
        title={page?.seoTitle}
        metaDescription={page?.seoMetaDescription}
      />
      <PageBanner
        title={page?.pageTitle as string}
        bannerImage={page?.banner?.url || BANNER_URL}
      />
      <Container>
        <main className="flex flex-col items-center justify-center">
          {data?.podcastsCollection?.items &&
            data?.podcastsCollection?.items.map((podcast: any) =>
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
              )
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
      <FeaturedReview name={review?.name} quote={review?.quote} />
    </FadeInContainer>
  );
};

export default PodcastPage;
