import React from 'react';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { Post } from 'types/Post';
import PostPage from 'components/pages/PostPage';
import { IFeaturedReview } from 'types/Review';
import { blogPostQuery, reviewsQuery } from 'utils/api';
import { formatReview } from 'utils/helpers';

interface Props {
  post: Post;
  featuredReview: IFeaturedReview;
}

const Post = ({ post, featuredReview }: Props) => (
  <PostPage featuredReview={featuredReview} post={post} />
);

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const request = await blogPostQuery(context?.params?.slug);
  const reviews = await reviewsQuery();
  const featuredReview = formatReview(reviews);

  return {
    props: {
      post: request,
      featuredReview: featuredReview ? featuredReview : null,
    },
  };
};

export default Post;
