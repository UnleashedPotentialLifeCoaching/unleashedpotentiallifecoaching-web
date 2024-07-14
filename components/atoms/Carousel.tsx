import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import classNames from 'classnames';
import Slider from 'react-slick';
import Image from 'next/image';
import { useMemo } from 'react';

interface IPhoto {
  source: string;
  alt: string;
}
const Carousel = ({
  settings,
  photoArray,
  carouselHeight,
  borderStyle,
}: {
  settings: {
    [key: string]: string | number | boolean;
  };
  photoArray: IPhoto[];
  carouselHeight: string;
  borderStyle?: string;
}) => {
  const containerClass = useMemo(
    () =>
      classNames(
        'max-w-full overflow-hidden bg-forrest',
        carouselHeight,
        borderStyle,
      ),
    [carouselHeight, borderStyle],
  );

  const slideClass = useMemo(
    () => classNames('"w-full relative', carouselHeight),
    [carouselHeight],
  );

  return (
    <div className={containerClass}>
      <Slider {...settings}>
        {photoArray.map((image: { alt: string; source: string }) => (
          <div key={image.alt} className={slideClass}>
            <Image
              src={image.source}
              alt={image.alt}
              fill={true}
              style={{ objectFit: 'cover' }}
              priority={false}
              sizes="100%"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Carousel;
