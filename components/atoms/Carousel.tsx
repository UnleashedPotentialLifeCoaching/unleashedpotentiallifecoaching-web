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
}: {
  settings: {
    [key: string]: string | number | boolean;
  };
  photoArray: IPhoto[];
  carouselHeight: string;
}) => {
  const containerClass = useMemo(
    () =>
      classNames(
        'border-t-2 border-b-2 border-black max-w-full overflow-hidden bg-forrest',
        carouselHeight,
      ),
    [carouselHeight],
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
