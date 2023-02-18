import dynamic from 'next/dynamic';
import FadeInContainer from 'layouts/FadeInContainer';
import Container from 'layouts/Container';
import PageBanner from 'components/shared/PageBanner';
import SiteHead from 'components/shared/SiteHead';
import {
  BANNER_URL,
  NEXT_PUBLIC_CONTENTFUL_GRAPHQL_API_URL,
  NEXT_PUBLIC_CONTENTFUL_MANAGEMENT_API_ACCESS_TOKEN,
} from 'utils/constants';
import Link from 'next/link';
import Image from 'next/legacy/image';
import { format } from 'date-fns';
import {
  IBlogPostFields,
  IReviewFields,
  ISimplePageFields,
} from 'types/contentful';
import { useQuery } from 'react-query';
import { gql, GraphQLClient } from 'graphql-request';
import { useEffect, useState } from 'react';

const FeaturedReview = dynamic(
  () => import('components/shared/FeaturedReview')
);

interface Props {
  review: IReviewFields;
  page: ISimplePageFields;
}

const endpoint = NEXT_PUBLIC_CONTENTFUL_GRAPHQL_API_URL;

const graphQLClient = new GraphQLClient(endpoint as string, {
  headers: {
    Authorization: `Bearer ${NEXT_PUBLIC_CONTENTFUL_MANAGEMENT_API_ACCESS_TOKEN}`,
    'Content-Type': 'application/json',
    'User-Agent':
      'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.89 Safari/537.36',
    Accept: 'application/json; charset=UTF-8',
  },
});

const blogPostsQuery = gql`
  query blogPostCollectionQuery($limit: Int) {
    blogPostCollection(order: publishDate_DESC, limit: $limit) {
      total
      items {
        postTItle
        publishDate
        slugText
        outsideLink
        subTitle
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
        featuredImage {
          url
          width
          height
        }
      }
    }
  }
`;

function useGetPosts(variables: any) {
  return useQuery(
    ['posts', variables],
    async () => {
      const data = await graphQLClient.request(blogPostsQuery, variables);
      return data;
    },
    { keepPreviousData: true }
  );
}

const BlogPage = ({ review, page }: Props) => {
  const [variables, setVariables] = useState({
    limit: 4,
  });
  const [disableBtn, setDisableBtn] = useState(false);

  const { isLoading, data } = useGetPosts(variables);

  const handleAmountChange = () => {
    if (data?.blogPostCollection?.total !== variables?.limit) {
      let updateLimit = variables?.limit + 1;
      setVariables({
        limit: updateLimit,
      });
    } else {
      setDisableBtn(true);
    }
  };

  useEffect(() => {
    if (data?.blogPostCollection?.total < 4) {
      setDisableBtn(true);
    }
  }, []);

  return (
    <FadeInContainer>
      <SiteHead
        title={page?.seoTitle}
        metaDescription={page?.seoMetaDescription}
      />
      <PageBanner
        title={page?.pageTitle as string}
        bannerImage={page?.banner?.url || BANNER_URL}
      />
      <Container>
        <main className="flex flex-col items-center justify-center">
          {data?.blogPostCollection?.items.map((post: IBlogPostFields) =>
            post?.slugText ? (
              <Link
                href={`/post/${post?.slugText}`}
                key={JSON.stringify(post)}
                className="flex flex-col pb-12 border-b sm:flex-row"
                passHref
              >
                <Image
                  src={post?.featuredImage?.url}
                  alt={(post?.postTItle as string) || 'Image not found'}
                  width={(post?.featuredImage?.width as number) / 2}
                  height={(post?.featuredImage?.height as number) / 2}
                />
                <div className="mt-3 sm:mt-0 sm:ml-8 blog-post-excerpt">
                  <p className="text-2xl text-forrest">{post?.postTItle}</p>
                  <p className="flex flex-row items-center my-2">
                    <span className="mr-1 font-bold leading-snug text-stone-400">
                      Date:{' '}
                    </span>
                    <span className="mr-3 text-base text-stone-500">
                      {format(
                        new Date(post?.publishDate as string),
                        'MMMM dd, yyyy'
                      )}
                    </span>
                    <span className="mr-1 font-bold leading-snug text-stone-400">
                      Coach:
                    </span>
                    <span className="text-base text-stone-500">
                      {post?.author?.name}
                    </span>
                  </p>
                  <p className="font-serif text-base leading-7">
                    {post?.subTitle}
                  </p>
                  <button className="px-6 py-3 my-6 text-xl text-white rounded-sm bg-forrest">
                    Read More
                  </button>
                </div>
              </Link>
            ) : (
              <a
                href={post?.outsideLink}
                key={JSON.stringify(post)}
                className="flex flex-col pb-12 border-b sm:flex-row"
                target="_blank"
                rel="noreferrer"
              >
                <Image
                  src={post?.featuredImage?.url}
                  alt={(post?.postTItle as string) || 'Image not found'}
                  width={(post?.featuredImage?.width as number) / 2}
                  height={(post?.featuredImage?.height as number) / 2}
                />
                <div className="mt-3 sm:mt-0 sm:ml-8 blog-post-excerpt">
                  <p className="text-2xl text-forrest">{post?.postTItle}</p>
                  <p className="flex flex-row items-center my-2">
                    <span className="mr-1 font-bold leading-snug text-stone-400">
                      Date:{' '}
                    </span>
                    <span className="mr-3 text-base text-stone-500">
                      {format(
                        new Date(post?.publishDate as string),
                        'MMMM dd, yyyy'
                      )}
                    </span>
                    <span className="mr-1 font-bold leading-snug text-stone-400">
                      Coach:
                    </span>
                    <span className="text-base text-stone-500">
                      {post?.author?.name}
                    </span>
                  </p>
                  <p className="font-serif text-base leading-7">
                    {post?.subTitle}
                  </p>
                  <button className="px-6 py-3 my-6 text-xl text-white rounded-sm bg-forrest">
                    Read More
                  </button>
                </div>
              </a>
            )
          )}
        </main>
      </Container>
      <div className="flex flex-row justify-center w-full mb-8">
        <button
          onClick={() => handleAmountChange()}
          disabled={disableBtn || isLoading}
          className={` ${
            Boolean(disableBtn || isLoading) ? 'opacity-25' : ''
          } mb-4 sm:mb-0 font-bold w-full sm:w-2/4 text-center py-3 rounded bg-forrest text-white text-2xl`}
        >
          Load More
        </button>
      </div>
      <FeaturedReview name={review?.name} quote={review?.quote} />
    </FadeInContainer>
  );
};
export default BlogPage;
