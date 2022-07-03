import dynamic from 'next/dynamic';
import FadeInContainer from 'layouts/FadeInContainer';
import Container from 'layouts/Container';
import PageBanner from 'components/shared/PageBanner';
import SiteHead from 'components/shared/SiteHead';
import { BANNER_URL } from 'utils/constants';
import { IFeaturedReview } from 'types/Review';
import { Seo } from 'types/SEO';
import Link from 'next/link';
import Image from 'next/image';
import { format } from 'date-fns';

const FeaturedReview = dynamic(
  () => import('components/shared/FeaturedReview')
);

interface Props {
  featuredReview: IFeaturedReview;
  posts: any;
  page: {
    seo: Seo;
    bannerImage?: string;
    title: string;
  };
}

const BlogPage = ({ featuredReview, posts, page }: Props) => {
  return (
    <FadeInContainer>
      <SiteHead {...page?.seo} />
      <PageBanner
        title={page?.title}
        bannerImage={page?.bannerImage || BANNER_URL}
      />
      <Container>
        <main className="flex flex-col items-center justify-center">
          {posts.map((post: any) => (
            <Link href={`/post/${post?.slug_text}`} key={JSON.stringify(post)}>
              <a className="flex flex-col pb-12 border-b sm:flex-row">
                <Image
                  src={post?.featured_image?.url}
                  alt={post?.post_title}
                  width={post?.featured_image?.dimensions?.width / 2}
                  height={post?.featured_image?.dimensions?.height / 2}
                />
                <div className="mt-3 sm:mt-0 sm:ml-8 blog-post-excerpt">
                  <p className="text-2xl text-forrest">
                    {post?.post_title[0]?.text}
                  </p>
                  <p className="flex flex-row items-center my-2">
                    <span className="mr-1 font-bold leading-snug text-stone-400">
                      Date:{' '}
                    </span>
                    <span className="mr-3 text-base text-stone-500">
                      {format(new Date(post?.publish_date), 'LLLL M, yyyy')}
                    </span>
                    <span className="mr-1 font-bold leading-snug text-stone-400">
                      Coach:
                    </span>
                    <span className="text-base text-stone-500">
                      {post?.author?.name[0]?.text}
                    </span>
                  </p>
                  <p className="font-serif text-base leading-7">
                    {post?.sub_title[0]?.text}
                  </p>
                  <button className="px-6 py-3 my-6 text-xl text-white rounded-sm bg-forrest">
                    Read More
                  </button>
                </div>
              </a>
            </Link>
          ))}
        </main>
      </Container>
      <FeaturedReview {...featuredReview} />
    </FadeInContainer>
  );
};
export default BlogPage;
