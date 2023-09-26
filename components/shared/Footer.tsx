import Banner from 'components/organisms/footer/Banner';
import ContactForm from 'components/organisms/footer/ContactForm';
import ContactInfo from 'components/organisms/footer/ContactInfo';
import SubFooter from 'components/organisms/footer/SubFooter';
import Container from 'layouts/Container';
import dynamic from 'next/dynamic';

const FeaturedReview = dynamic(
  () => import('components/shared/FeaturedReview'),
);

const Footer = () => (
  <>
    <FeaturedReview />
    <div className="w-100">
      <Container>
        <Banner />
        <div className="flex flex-col lg:flex-row lg:space-evenly items-center lg:items-start mt-12 sm:mt-24">
          <ContactInfo />
          <ContactForm />
        </div>
        <SubFooter />
      </Container>
    </div>
  </>
);

export default Footer;
