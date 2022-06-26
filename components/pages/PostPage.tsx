import ProfileHeader from 'components/organisms/coach/ProfileHeader';
import SiteHead from 'components/shared/SiteHead';
import Container from 'layouts/Container';
import FadeInContainer from 'layouts/FadeInContainer';
import dynamic from 'next/dynamic';
import Image from "next/image";
import React from 'react';
import {Post} from 'types/Post';
import { IFeaturedReview } from 'types/Review';
import { SEO_DEFAULTS } from 'utils/constants';

const FeaturedReview = dynamic(
  () => import('components/shared/FeaturedReview')
);

interface Props {
  post: Post;
  featuredReview: IFeaturedReview;
}

const PostPage = ({ post, featuredReview }: Props) => {
  const seoMetaDescription = post?.seo_meta_description || SEO_DEFAULTS.metaDescription;
  const seoTitle = post?.seo_meta_title || SEO_DEFAULTS.title;
  console.log({ seoTitle, seoMetaDescription})
  console.log({ post })
  return (
    <FadeInContainer>
      <SiteHead title={seoTitle} metaDescription={seoMetaDescription} />
      <main>
        <Container>

          <div className="flex flex-col w-full sm:flex-row">

            <div className="w-full sm:w-3/4">
              <h1 className="mb-12 text-3xl leading-loose text-gray-600 sm:text-5xl md:text-6xl">{post?.post_title[0]?.text}</h1>
              {post?.featured_image && (
                 <Image
                   src={post?.featured_image?.url}
                   alt={post?.post_title[0]?.text}
                   width={post?.featured_image?.dimensions?.width}
                   height={post?.featured_image?.dimensions?.height}
                   layout="intrinsic"
               />
              )}
            </div>
            <div className="w-full sm:w-1/4">
               Sidebar..
            </div>
          </div>
        </Container>
      </main>
      <FeaturedReview {...featuredReview} />
    </FadeInContainer>
  );
};

export default PostPage
