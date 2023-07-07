import React from 'react';
import {
  GetServerSideProps,
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from 'next';
import PostPage from 'components/pages/PostPage';
import { IBlogPostFields, IReviewFields } from 'types/contentful';
import { fetchAPI } from 'utils/api';

const blogPostsQuery = (slug: string) => `
query blogPostCollectionQuery {
  blogPostCollection(where:{
    slugText: "${slug}"
  }, limit: 1) {
    items {
      postTItle
      publishDate
      slugText
      postContent {
        json
      }
      featuredImage {
        url
        width
        height
      }
      seoTitle
      seoMetaDescription
      author {
        ... on Coach {
          name
          profileImage {
            url
            width
            height
          }
        }
      }
    }
  }
}
`;

const featuredReview = `query reviewCollectionQuery {
  reviewCollection(
    limit: 1,
    where:{
    featuredReview: true
  }) {
    items {
      name
      quote{
        json
      }
    }
  }
}`;

interface Props {
  review: IReviewFields;
  post: IBlogPostFields;
}

const Post = ({
  review,
  post,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => (
  <PostPage review={review} post={post} postContent={post?.postContent} />
);

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const slug = context?.params?.slug as string;
  const featuredReviewData = await fetchAPI(featuredReview, {});
  const postData = await fetchAPI(blogPostsQuery(slug));

  if (postData?.data?.blogPostCollection?.items.length === 0) {
    return {
      notFound: true,
    };
  }

  const review = featuredReviewData?.data?.reviewCollection
    ?.items[0] as IReviewFields;
  const post = postData?.data?.blogPostCollection?.items.find(
    ({ slugText }: { slugText: string }) => slugText === slug
  ) as IBlogPostFields;

  context.res.setHeader(
    'Cache-Control',
    'public, s-maxage=300, stale-while-revalidate=59'
  );

  return {
    props: {
      post,
      review,
    },
  };
};

export default Post;
