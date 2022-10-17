import React from 'react';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
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

const Post = ({ review, post }: Props) => (
  <PostPage review={review} post={post} postContent={post?.postContent} />
);

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const slug = context?.params?.slug as string;
  const featuredReviewData = await fetchAPI(featuredReview, {});
  const postData = await fetchAPI(blogPostsQuery(slug));
  const review = featuredReviewData?.data?.reviewCollection
    ?.items[0] as IReviewFields;
  const post = postData?.data?.blogPostCollection?.items[0] as IBlogPostFields;

  context.res.setHeader(
    'Cache-Control',
    'public, s-maxage=864000, stale-while-revalidate=59'
  );

  return {
    props: {
      post,
      review,
    },
  };
};

export default Post;
