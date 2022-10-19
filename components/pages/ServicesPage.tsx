import styled from 'styled-components';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import ServiceCard from 'components/molecules/ServiceCard';
import PageBanner from 'components/shared/PageBanner';
import SiteHead from 'components/shared/SiteHead';
import Container from 'layouts/Container';
import ContentWrapper from 'layouts/ContentWrapper';
import FadeInContainer from 'layouts/FadeInContainer';
import dynamic from 'next/dynamic';
import React from 'react';
import {
  ICoachFields,
  IReviewFields,
  IPageFields,
  IServicePageFields,
} from 'types/contentful';

const FeaturedReview = dynamic(
  () => import('components/shared/FeaturedReview')
);

interface Props {
  review: IReviewFields;
  coaches: ICoachFields[];
  page: IPageFields;
  pageContent: any;
}

const BorderRight = styled.div`
  height: 1px;
  background: #aaa;
  width: 100%;
`;

const BorderMessage = styled.div`
  background: #fff;
  position: relative;
  top: -40px;
  width: 297px;
  padding-top: 10px;
  padding-bottom: 10px;
  margin: auto;
`;

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
      <br />
      <BorderRight />
      <BorderMessage>
        <h5 className="text-5xl text-center font-serif text-forrest">
          Learn more
        </h5>
      </BorderMessage>
      <br />
      <div className="mx-auto max-w-full lg:max-w-6xl">
        {coaches
          .sort((a, b) =>
            (a.appearanceOrder as number) > (b.appearanceOrder as number)
              ? 1
              : -1
          )
          .map((coach: ICoachFields) => (
            <ServiceCard
              name={coach?.name as string}
              bookTimePhoto={coach?.bookTimePhoto?.url}
              key={coach?.name}
            />
          ))}
      </div>
    </Container>
    <FeaturedReview name={review?.name} quote={review?.quote} />
  </FadeInContainer>
);

export default ServicesPage;
