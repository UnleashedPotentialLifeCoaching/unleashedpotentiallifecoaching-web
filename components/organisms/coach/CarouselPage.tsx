import FadeInCarousel from 'components/molecules/FadeInCarousel';
import Biography from 'components/molecules/coach/Biography';
import ProfileHeader from 'components/molecules/coach/ProfileHeader';

const CarouselPage = ({
  name,
  profileImage,
  welcomeMessage,
  biography,
}: {
  name: string;
  profileImage: string;
  welcomeMessage: any;
  biography: any;
}) => (
  <>
    {/* <ProfileHeader
      name={name as string}
      profileImage={profileImage}
      welcomeMessage={welcomeMessage}
    /> */}
    <FadeInCarousel />
    <br />
    <Biography biography={biography} />
  </>
);

export default CarouselPage;
