import dynamic from 'next/dynamic';
import { RichText, RichTextBlock } from 'prismic-reactjs';
import PageBanner from 'components/shared/PageBanner';
import SiteHead from 'components/shared/SiteHead';
import Container from 'layouts/Container';
import FadeInContainer from 'layouts/FadeInContainer';
import ContentWrapper from 'layouts/ContentWrapper';
import { Review } from 'types/Review';
import { Seo } from 'types/SEO';

const FeaturedReview = dynamic(
  () => import('components/shared/FeaturedReview')
);

interface Props {
  seo: Seo;
  title: string;
  pageContent: RichTextBlock[];
  featuredReview: Review;
  banner_image?: string | null | undefined;
}

const OurStoryPage = ({
  seo,
  title,
  pageContent,
  featuredReview,
  banner_image,
}: Props) => (
  <FadeInContainer>
    <SiteHead {...seo} />
    <PageBanner bannerImage={banner_image} title={title} />
    <main>
      <Container>
        <ContentWrapper>
          <RichText render={pageContent} />
        </ContentWrapper>
      </Container>
    </main>
    <FeaturedReview {...featuredReview} />
  </FadeInContainer>
);

export default OurStoryPage;
