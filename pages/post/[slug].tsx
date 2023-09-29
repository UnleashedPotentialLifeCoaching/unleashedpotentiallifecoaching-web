import React from 'react';
import {
  GetServerSideProps,
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from 'next';
import PostPage from 'components/pages/PostPage';
import { IBlogPostFields, IReviewFields } from 'types/contentful';
import { fetchAPI } from 'utils/api';
import { blogPostQuery } from 'utils/queries';
import { CACHE_CONTROL, CACHE_LIFE } from 'utils/constants';

const Post = ({
  post,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => (
  <PostPage post={post} postContent={post?.postContent} />
);

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  const slug = context?.params?.slug as string;
  const postData = await fetchAPI(blogPostQuery(slug), {});

  if (postData?.data?.blogPostCollection?.items.length === 0) {
    return {
      notFound: true,
    };
  }

  const post = postData?.data?.blogPostCollection?.items.find(
    ({ slugText }: { slugText: string }) => slugText === slug,
  ) as IBlogPostFields;

  context.res.setHeader(CACHE_CONTROL, CACHE_LIFE);

  return {
    props: {
      post,
    },
  };
};

export default Post;
