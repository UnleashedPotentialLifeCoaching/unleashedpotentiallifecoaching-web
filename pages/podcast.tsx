import { useState, useEffect } from 'react';
import PodcastPage from 'components/pages/PodcastPage';
import { GetServerSideProps } from 'next';
import { YT_CHANNEL_URL, YT_CHANNEL_URL_NEXT_PAGE } from 'utils/constants';
import { YTProps, VIDEO_PROPS, PAGE } from 'types/Podcast';
import { IFeaturedReview } from 'types/Review';
import { reviewsQuery, podcastQuery } from 'utils/api';
import { formatReview } from 'utils/helpers';

interface Props {
  featuredReview: IFeaturedReview;
  page: PAGE;
}

const PodCast = ({ featuredReview, page }: Props) => {
  const [videos, setVideos] = useState<VIDEO_PROPS[]>([]);
  const [nextPageToken, setNextPageToken] = useState<string>('');
  const [prevPageToken, setPrevPageToken] = useState<string>('');
  const [triggerNextPage, setTriggerNextPage] = useState<boolean>(false);
  const [triggerPrevPage, setTriggerPrevPage] = useState<boolean>(false);

  

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
console.log({ request })
      if (request.items.length > 0) {
        if(request?.nextPageToken) {
          setNextPageToken(request?.nextPageToken);
        }
        
       if(request?.prevPageToken) {
          setPrevPageToken(request?.prevPageToken);
        }
        const videoData: VIDEO_PROPS[] = request.items.map(
          ({ id, snippet }: YTProps) => ({
            url: `https://www.youtube.com/embed/${id.videoId}`,
            title: snippet.title,
            description: snippet.description,
          })
        );
        setVideos(videoData);
      }
    };

    if (videos.length <= 0) {
      getVideos(YT_CHANNEL_URL);
    }

    if(triggerNextPage) {
      const nextPageUrl = YT_CHANNEL_URL_NEXT_PAGE(nextPageToken);
      getVideos(nextPageUrl)
      setTriggerNextPage(false);
    }
    if(triggerPrevPage) {
      const nextPageUrl = YT_CHANNEL_URL_NEXT_PAGE(prevPageToken);
      getVideos(nextPageUrl)
      setTriggerPrevPage(false);
    }
  }, [videos, triggerNextPage, nextPageToken, prevPageToken, triggerPrevPage]);

  const podcastPageProps = {
    featuredReview,
    page,
    videos,
    setTriggerNextPage,
    setTriggerPrevPage,
    nextPageToken,
    prevPageToken
  };

  return <PodcastPage {...podcastPageProps} />;
};

export const getServerSideProps: GetServerSideProps = async () => {
  const reviews = await reviewsQuery();
  const request = await podcastQuery();
  const featuredReview = formatReview(reviews);

  const formatPage = request.map(({ node }: { node: any }) => ({
    seo: {
      title: node.seo_title[0].text,
      metaDescription: node.seo_meta_description[0].text,
    },
    banner_image: node.banner_image.url,
  }));

  return {
    props: {
      featuredReview: (featuredReview) ? featuredReview : null,
      page: formatPage[0],
    },
  };
};

export default PodCast;
