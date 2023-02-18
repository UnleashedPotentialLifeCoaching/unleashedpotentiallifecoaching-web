import dynamic from 'next/dynamic';
import FadeInContainer from 'layouts/FadeInContainer';
import Container from 'layouts/Container';
import PageBanner from 'components/shared/PageBanner';
import SiteHead from 'components/shared/SiteHead';
import { BANNER_URL } from 'utils/constants';
import Link from 'next/link';
import Image from 'next/legacy/image';
import { format } from 'date-fns';
import {
  IBlogPostFields,
  IReviewFields,
  ISimplePageFields,
} from 'types/contentful';

const FeaturedReview = dynamic(
  () => import('components/shared/FeaturedReview')
);

interface Props {
  review: IReviewFields;
  page: ISimplePageFields;
}

const BlogPage = ({ review, page }: Props) => {
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
          {/* {posts.map((post: IBlogPostFields) => (
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
                      'LLLL M, yyyy'
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
          ))} */}
        </main>
      </Container>
      <FeaturedReview name={review?.name} quote={review?.quote} />
    </FadeInContainer>
  );
};
export default BlogPage;
