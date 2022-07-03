import ServiceCard from 'components/molecules/ServiceCard';
import PageBanner from 'components/shared/PageBanner';
import SiteHead from 'components/shared/SiteHead';
import Container from 'layouts/Container';
import ContentWrapper from 'layouts/ContentWrapper';
import FadeInContainer from 'layouts/FadeInContainer';
import dynamic from 'next/dynamic';
import { RichText, RichTextBlock } from 'prismic-reactjs';
import React from 'react';
import { Coach } from 'types/Coach';
import { IFeaturedReview } from 'types/Review';
import { Seo } from 'types/SEO';

const FeaturedReview = dynamic(
  () => import('components/shared/FeaturedReview')
);

interface Props {
  seo: Seo;
  page_blocks: {
    section_content: RichTextBlock[];
    section_title: RichTextBlock[];
  }[];
  featuredReview: IFeaturedReview;
  coaches: Coach[];
  bannerImage?: string;
}

const CoachPage = ({
  page_blocks,
  seo,
  coaches,
  featuredReview,
  bannerImage,
}: Props) => (
  <FadeInContainer>
    <SiteHead {...seo} />
    <PageBanner title="Services" bannerImage={bannerImage} />
    <Container>
      <ContentWrapper>
        {page_blocks.map(({ section_content, section_title }) => (
          <div key={section_title[0].text}>
            <RichText render={section_title} />
            <RichText render={section_content} />
          </div>
        ))}
      </ContentWrapper>
      <div className="mx-auto max-w-full lg:max-w-6xl">
        {coaches.map(({ name, image }) => (
          <ServiceCard name={name} image={image} key={name} />
        ))}
      </div>
    </Container>
    <FeaturedReview {...featuredReview} />
  </FadeInContainer>
);

export default CoachPage;
