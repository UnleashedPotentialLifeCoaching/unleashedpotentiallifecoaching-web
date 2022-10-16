import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import ServiceCard from 'components/molecules/ServiceCard';
import PageBanner from 'components/shared/PageBanner';
import SiteHead from 'components/shared/SiteHead';
import Container from 'layouts/Container';
import ContentWrapper from 'layouts/ContentWrapper';
import FadeInContainer from 'layouts/FadeInContainer';
import dynamic from 'next/dynamic';
import React from 'react';
import { ICoachFields, IReviewFields, IPageFields } from 'types/contentful';

const FeaturedReview = dynamic(
  () => import('components/shared/FeaturedReview')
);

interface Props {
  review: IReviewFields;
  coaches: ICoachFields[];
  page: IPageFields;
  pageContent: any;
}

const ServicesPage = ({ page, pageContent, coaches, review }: Props) => (
  <FadeInContainer>
    <SiteHead
      title={page?.seoTitle}
      metaDescription={page?.seoMetaDescription}
    />
    <PageBanner
      title={page?.pageTitle as string}
      bannerImage={page?.banner?.url}
    />
    <Container>
      <ContentWrapper>
        {documentToReactComponents(pageContent?.json)}
      </ContentWrapper>
      <div className="mx-auto max-w-full lg:max-w-6xl">
        {coaches
          .sort((a, b) =>
            (a.appearanceOrder as number) > (b.appearanceOrder as number)
              ? 1
              : -1
          )
          .map(({ name, bookTimePhoto }) => (
            <ServiceCard
              name={name as string}
              bookTimePhoto={bookTimePhoto?.url}
              key={name}
            />
          ))}
      </div>
    </Container>
    <FeaturedReview name={review?.name} quote={review?.quote} />
  </FadeInContainer>
);

export default ServicesPage;
