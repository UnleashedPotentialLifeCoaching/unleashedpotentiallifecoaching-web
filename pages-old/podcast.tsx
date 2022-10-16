import { useState, useEffect } from 'react';
import PodcastPage from 'components/pages/PodcastPage';
import { GetServerSideProps } from 'next';
import { YT_CHANNEL_URL, YT_CHANNEL_URL_NEXT_PAGE } from 'utils/constants';
import { YTProps, VIDEO_PROPS, PAGE } from 'types/Podcast';
import { IFeaturedReview } from 'types/Review';
import { reviewsQuery, podcastQuery } from 'utils/api';
import { formatReview } from 'utils/helpers';
import { useQuery } from '@tanstack/react-query';

interface Props {
  featuredReview: IFeaturedReview;
  page: PAGE;
}

const PodCast = () => {
  const [videos, setVideos] = useState<VIDEO_PROPS[]>([]);
  const [nextPageToken, setNextPageToken] = useState<string>('');
  const [triggerNextPage, setTriggerNextPage] = useState<boolean>(false);
  const videosTwo = useQuery(
    ['todos'],
    fetch(YT_CHANNEL_URL_NEXT_PAGE(nextPageToken), {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
  );

  console.log({ videosTwo });

  useEffect(() => {
    const getVideos = async (channelUrl: string) => {
      const request = await fetch(channelUrl, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
        .then((data) => data.json())
        .catch((err) => err);
      if (request.items.length > 0) {
        if (request?.nextPageToken) {
          setNextPageToken(request?.nextPageToken);
        }

        const videoData: VIDEO_PROPS[] = request.items.map(
          ({ id, snippet }: YTProps) => ({
            url: `https://www.youtube.com/embed/${id.videoId}`,
            title: snippet.title,
            description: snippet.description,
          })
        );
        if (videos.length > 1) {
          setVideos((prev) => [...prev, ...videoData]);
        } else {
          setVideos(videoData);
        }
      }
    };

    if (videos.length <= 0) {
      getVideos(YT_CHANNEL_URL);
    }

    if (triggerNextPage) {
      const nextPageUrl = YT_CHANNEL_URL_NEXT_PAGE(nextPageToken);
      getVideos(nextPageUrl);
      setTriggerNextPage(false);
    }
  }, [videos, triggerNextPage, nextPageToken]);

  // const podcastPageProps = {
  //   featuredReview,
  //   page,
  //   videos,
  //   setTriggerNextPage,
  //   nextPageToken,
  // };

  // return <PodcastPage {...podcastPageProps} />;
  return null;
};

// export const getServerSideProps: GetServerSideProps = async () => {
//   const reviews = await reviewsQuery();
//   const request = await podcastQuery();
//   const featuredReview = formatReview(reviews);

//   const formatPage = request.map(({ node }: { node: any }) => ({
//     seo: {
//       title: node.seo_title[0].text,
//       metaDescription: node.seo_meta_description[0].text,
//     },
//     banner_image: node.banner_image.url,
//   }));

//   return {
//     props: {
//       featuredReview: featuredReview ? featuredReview : null,
//       page: formatPage[0],
//     },
//   };
// };

export default PodCast;
