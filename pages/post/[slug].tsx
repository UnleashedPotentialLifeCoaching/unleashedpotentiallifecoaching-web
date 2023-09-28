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

  context.res.setHeader(
    'Cache-Control',
    'public, s-maxage=300, stale-while-revalidate=59',
  );

  return {
    props: {
      post,
    },
  };
};

export default Post;
