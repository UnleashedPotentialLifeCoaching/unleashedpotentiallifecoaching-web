import Link from 'next/link';
import React from 'react';
import ImageWrapper from 'components/atoms/ImageWrapper';
import { Coach } from 'types/Coach';
import { urlify } from 'utils/helpers';

const CoachCard = ({ name, image }: Coach) => {
  const { src, alt } = image;
  const coachUrl = `/coach/${urlify(name)}`;
  return (
    <div className="bg-white rounded p-4 flex flex-col md:mx-16 my-0 mb-20 xl:mx-4 2xl:mx-8 items-center hover:shadow-xl hover:scale-105 ease-in duration-200">
      <Link href={coachUrl}>
        <a>
          <ImageWrapper src={src} width={420} height={420} alt={alt} />
          <div className="flex flex-col my-6">
            <p className="font-bold mb-0 text-2xl">1 hour coaching with</p>
            <p className="text-forrest-900 text-2xl mt-0">{name}</p>
          </div>
        </a>
      </Link>
    </div>
  );
};

export default CoachCard;
