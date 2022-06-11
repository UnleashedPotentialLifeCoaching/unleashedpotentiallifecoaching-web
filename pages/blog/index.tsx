import { GetServerSideProps } from 'next';
import React from 'react';
import { Review } from 'types/Review';
import { allBlogsQuery, reviewsQuery } from 'utils/api';
import { formatReview } from 'utils/helpers';

interface Props {
  featuredReview: Review;
  posts: any;
}

const Blog =  ({ featuredReview, posts }: Props) => {
  const pageProps ={ featuredReview, posts };
 return (
   <div>Well get there..</div>
 )
};

export const getServerSideProps: GetServerSideProps = async () => {
  const reviews = await reviewsQuery();
  const featuredReview = formatReview(reviews);
  const fetchPosts = await allBlogsQuery();
  console.log({ fetchPosts })
  const posts = fetchPosts?.map(({ node }: any) =>  node);

  return {
    props: {
      posts,
      featuredReview: (featuredReview) ? featuredReview : null,
    }
  }

}

export default Blog;