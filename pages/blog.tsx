import {
  IHomePageFields,
  ICoachFields,
  IReviewFields,
  ISimplePageFields,
  IBlogPostFields,
} from 'types/contentful';
import BlogPage from 'components/pages/BlogPage';
import { GetServerSideProps } from 'next';
import { fetchAPI } from 'utils/api';

const blogPageQuery = `
  query simplePageEntryQuery {
  simplePage(id: "6zowWUPrZmyZ0HjQXBnoye") {
    pageTitle
    seoTitle
    seoMetaDescription
    banner {
      url
    }
  }
}
`;

const blogPostsQuery = `
query blogPostCollectionQuery {
  blogPostCollection {
    items {
      postTItle
      publishDate
      slugText
      subTitle
      author {
        ...on Coach {
          name
          profileImage {
            url
            width
            height
          }
        }
      }
      featuredImage {
        url
        width
        height
      }
    }
  }
}`;

const featuredReview = `query reviewCollectionQuery {
  reviewCollection(where:{
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
  page: ISimplePageFields;
  review: IReviewFields;
  posts: IBlogPostFields[];
}

const Blog = ({ page, review, posts }: Props) => {
  const blogPageProps = { page, review, posts };

  console.log({ posts });

  return <BlogPage {...blogPageProps} />;
  return null;
};

export const getServerSideProps: GetServerSideProps = async () => {
  const blogPageData = await fetchAPI(blogPageQuery, {});
  const blogPostsData = await fetchAPI(blogPostsQuery, {});
  const featuredReviewData = await fetchAPI(featuredReview, {});
  const page = blogPageData?.data?.simplePage as ISimplePageFields;
  const review = featuredReviewData?.data?.reviewCollection
    ?.items[0] as IReviewFields;
  const posts = blogPostsData?.data?.blogPostCollection
    ?.items as IBlogPostFields[];
  console.log({ posts });

  return {
    props: {
      page,
      review,
      posts,
    },
  };
};

export default Blog;
