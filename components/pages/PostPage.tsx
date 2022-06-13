import ProfileHeader from 'components/organisms/coach/ProfileHeader';
import SiteHead from 'components/shared/SiteHead';
import Container from 'layouts/Container';
import FadeInContainer from 'layouts/FadeInContainer';
import dynamic from 'next/dynamic';
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

         <p>We...</p>
        </Container>
      </main>
      <FeaturedReview {...featuredReview} />
    </FadeInContainer>
  );
};

export default PostPage
