import Container from 'layouts/Container';
import Link from 'next/link';
import Image from 'next/legacy/image';
import { format } from 'date-fns';
import { IBlogPostFields, ISimplePageFields } from 'types/contentful';
import { useEffect, useState } from 'react';
import { useGetPosts } from 'utils/api';
import SimplePageLayout from 'layouts/SimplePageLayout';
import { blogPostsQuery } from 'utils/queries';

interface Props {
  page: ISimplePageFields;
}

const BlogPage = ({ page }: Props) => {
  const [variables, setVariables] = useState({
    limit: 4,
  });
  const [disableBtn, setDisableBtn] = useState(true);

  const { isLoading, data } = useGetPosts('posts', blogPostsQuery, variables);

  const handleAmountChange = () => {
    try {
      if (data?.blogPostCollection.total !== variables?.limit) {
        let updateLimit = variables?.limit + 1;
        setVariables({
          limit: updateLimit,
        });
      } else {
        setDisableBtn(true);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (data) {
      if (data?.blogPostCollection?.total > 4) {
        setDisableBtn(false);
      }
    }
  }, [data]);

  return (
    <SimplePageLayout page={page}>
      <Container>
        <main className="flex flex-col items-center justify-center">
          {/** @ts-ignore */}
          {data?.blogPostCollection?.items.map((post: IBlogPostFields) =>
            post?.slugText ? (
              <Link
                href={`/post/${post?.slugText}`}
                key={JSON.stringify(post)}
                className="flex flex-col pb-12 my-8 border-b sm:flex-row"
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
                        'MMMM dd, yyyy',
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
              <Link
                href={post?.outsideLink as string}
                key={JSON.stringify(post)}
                legacyBehavior
              >
                <a
                  className="flex flex-col pb-12 my-8 border-b sm:flex-row"
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
                          'MMMM dd, yyyy',
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
              </Link>
            ),
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
    </SimplePageLayout>
  );
};
export default BlogPage;
