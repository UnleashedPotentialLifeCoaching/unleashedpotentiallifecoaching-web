import BlogPage from 'components/pages/BlogPage';
import { GetServerSideProps } from 'next';
import React from 'react';
import { IFeaturedReview } from 'types/Review';
import { Seo } from 'types/SEO';
import { allBlogsQuery, blogPageQuery, reviewsQuery } from 'utils/api';
import { formatReview } from 'utils/helpers';

interface Props {
  featuredReview: IFeaturedReview;
  posts: any;
  page: {
    seo: Seo;
    bannerImage?: string;
    title: string;
  };
}

const Blog = ({ featuredReview, posts, page }: Props) => {
  const pageProps = { featuredReview, posts, page };
  return <BlogPage {...pageProps} />;
};

export const getServerSideProps: GetServerSideProps = async () => {
  const reviews = await reviewsQuery();
  const featuredReview = formatReview(reviews);
  const fetchPosts = await allBlogsQuery();
  const fetchBlogPage = await blogPageQuery();
  const posts = fetchPosts?.map(({ node }: any) => node);
  ({ posts });
  const page = fetchBlogPage.map(({ node }: { node: any }) => ({
    seo: {
      title: node?.seo_title || '',
      metaDescription: node?.seo_meta_description || '',
    },
    title: node?.title[0]?.text,
    bannerImage: node.banner_image.url,
  }))[0];

  return {
    props: {
      posts,
      page,
      featuredReview: featuredReview ? featuredReview : null,
    },
  };
};

export default Blog;
