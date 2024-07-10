import CarouselCTA from 'components/shared/CarouselCTA';
import SimplePageLayout from 'layouts/SimplePageLayout';

const CarouselCTAPage = () => {
  const page = {
    pageTitle: 'Carousel CTA POC',
    seoTitle: 'Carousel CTA POC',
    seoMetaDescription: 'Carousel CTA POC',
  };
  return (
    <SimplePageLayout page={page}>
      <CarouselCTA />
    </SimplePageLayout>
  );
};
export default CarouselCTAPage;
