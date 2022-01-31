import { useState, useEffect } from 'react';
import PodcastPage from 'components/pages/PodcastPage';
import { GetServerSideProps } from 'next';
import { YT_CHANNEL_URL } from 'utils/constants';
import { YTProps, VIDEO_PROPS, PAGE } from 'types/Podcast';
import { Review } from 'types/Review';
import { reviewsQuery, podcastQuery } from 'utils/api';
import { formatReview } from 'utils/helpers';

interface Props {
  featuredReview: Review;
  page: PAGE;
}

const PodCast = ({ featuredReview, page }: Props) => {
  const [videos, setVideos] = useState<VIDEO_PROPS[]>([]);

  useEffect(() => {
    const getVideos = async () => {
      const request = await fetch(YT_CHANNEL_URL, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
        .then((data) => data.json())
        .catch((err) => err);

      if (request.items.length > 0) {
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
      getVideos();
    }
  }, [videos]);

  const podcastPageProps = {
    featuredReview,
    page,
    videos,
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
      featuredReview,
      page: formatPage[0],
    },
  };
};

export default PodCast;
