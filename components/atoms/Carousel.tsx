import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import { useMemo } from 'react';
import { CTA_CAROUSEL_ITEMS } from 'utils/constants';
import Image from 'next/image';

const Carousel = ({
  settings,
  photoArray,
  carouselHeight,
}: {
  settings: any;
  photoArray: any;
  carouselHeight: string;
}) => {
  return (
    <div className="border-t-2 border-b-2 border-black max-w-full overflow-hidden bg-forrest h-96">
      <Slider {...settings}>
        {photoArray.map((image: { alt: string; source: string }) => (
          <div key={image.alt} className="w-full h-96 relative">
            <Image
              src={image.source}
              alt={image.alt}
              layout="fill"
              objectFit="cover"
              priority={false}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Carousel;
