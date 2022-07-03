import ProfileHeader from 'components/organisms/coach/ProfileHeader';
import SiteHead from 'components/shared/SiteHead';
import Container from 'layouts/Container';
import FadeInContainer from 'layouts/FadeInContainer';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { Post } from 'types/Post';
import { IFeaturedReview } from 'types/Review';
import { SEO_DEFAULTS, SITE_URL } from 'utils/constants';
import { urlify } from 'utils/helpers';
import { AiOutlineFacebook, AiOutlineInstagram } from 'react-icons/ai';
import { RichText, RichTextBlock } from 'prismic-reactjs';
import { format } from 'date-fns';

const FeaturedReview = dynamic(
  () => import('components/shared/FeaturedReview')
);

interface Props {
  post: Post;
  featuredReview: IFeaturedReview;
}

const PostPage = ({ post, featuredReview }: Props) => {
  const seoMetaDescription =
    post?.seo_meta_description || SEO_DEFAULTS.metaDescription;
  const seoTitle = post?.seo_meta_title || SEO_DEFAULTS.title;
  return (
    <FadeInContainer>
      <SiteHead title={seoTitle} metaDescription={seoMetaDescription} />
      <main>
        <Container>
          <div className="flex flex-col w-full sm:flex-row">
            <div className="w-full sm:w-2/3">
              <h1 className="mb-4 text-3xl text-forrest sm:text-5xl md:text-6xl">
                {post?.post_title[0]?.text}
              </h1>
              <div className="flex flex-row w-full mb-4 text-stone-600">
                <p>
                  <span className="mr-1 font-bold leading-snug text-stone-400">
                    Date:{' '}
                  </span>
                  <span className="mr-3 text-base text-stone-500">
                    {format(new Date(post?.publish_date), 'LLLL M, yyyy')}
                  </span>
                  <span className="mr-1 font-bold leading-snug text-stone-400">
                    Author:
                  </span>
                  <span className="text-base text-stone-500">
                    {post?.author?.name[0]?.text}
                  </span>
                </p>
              </div>
              {post?.featured_image && (
                <Image
                  src={post?.featured_image?.url}
                  alt={post?.post_title[0]?.text}
                  width={post?.featured_image?.dimensions?.width}
                  height={post?.featured_image?.dimensions?.height}
                  layout="intrinsic"
                />
              )}
              <div className="blog-post-sub-title">
                <RichText render={post?.sub_title} />
              </div>
              <div className="blog-post-content">
                <RichText render={post?.post_content} />
              </div>
            </div>
            <div className="w-full sm:w-1/3 sm:px-12">
              <div className="flex flex-col w-full pb-3 mb-4 border-b-2">
                <Link
                  href={`/coach/${urlify(post?.author?.name[0]?.text || '')}`}
                >
                  <a>
                    <div className="relative w-24 h-24">
                      <Image
                        src={post?.author?.profile_image?.url}
                        alt={post?.author?.name[0]?.text}
                        layout="fill"
                        objectFit="cover"
                        className="rounded-full"
                      />
                    </div>
                    <p className="mt-3 text-gray-600">
                      <strong className="block">Meet our coach</strong>{' '}
                      {post?.author?.name[0]?.text}
                    </p>
                  </a>
                </Link>
              </div>
              <div className="p-2 bg-gray-100 rounded">
                <p className="text-sm font-bold text-center">Follow us</p>
                <div className="flex flex-row items-center justify-center my-3">
                  <a
                    href="https://www.facebook.com/unleashedpotentiallifecoaching/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <AiOutlineFacebook size={36} className="text-forrest" />
                    <span className="sr-only">Facebook</span>
                  </a>
                  <a
                    href="https://www.instagram.com/unleashedpotentiallifecoaching/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <AiOutlineInstagram size={36} className="text-forrest" />
                    <span className="sr-only">Instagram</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </main>
      <FeaturedReview {...featuredReview} />
    </FadeInContainer>
  );
};
export default PostPage;
