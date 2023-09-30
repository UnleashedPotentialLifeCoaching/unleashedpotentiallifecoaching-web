import React from 'react';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import PostPage from 'components/pages/PostPage';
import { IBlogPostFields } from 'types/contentful';
import { fetchAPI } from 'utils/api';
import { blogPostQuery, allBlogPostsQuery } from 'utils/queries';
import { CACHE_CONTROL, CACHE_LIFE } from 'utils/constants';

const Post = ({ post }: InferGetStaticPropsType<typeof getStaticProps>) => (
  <PostPage post={post} postContent={post?.postContent} />
);

export const getStaticPaths = async () => {
  const postsData = await fetchAPI(allBlogPostsQuery, {});
  const posts = postsData?.data?.blogPostCollection.items;

  return {
    fallback: true,
    paths: posts
      ?.map((post: any) => `/post/${post?.slugText}`)
      .filter((post: any) => post !== null),
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string;
  const postData = await fetchAPI(blogPostQuery(slug), {});

  if (postData?.data?.blogPostCollection?.items.length === 0) {
    return {
      notFound: true,
    };
  }

  const post = postData?.data?.blogPostCollection?.items.find(
    ({ slugText }: { slugText: string }) => slugText === slug,
  ) as IBlogPostFields;

  return {
    props: {
      post,
    },
  };
};

export default Post;
