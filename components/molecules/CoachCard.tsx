import Link from 'next/link';
import React from 'react';
import ImageWrapper from 'components/atoms/ImageWrapper';
import { urlify } from 'utils/helpers';

const CoachCard = ({
  name,
  url,
}: {
  name: string | undefined;
  url: string;
}) => {
  const coachUrl = `/coach/${urlify(name as string)}`;

  return (
    <div className="bg-white rounded p-4 flex flex-col md:mx-16 my-0 mb-20 xl:mx-4 2xl:mx-8 items-center hover:shadow-xl hover:scale-105 ease-in duration-200">
      <Link href={coachUrl}>
        <a>
          <ImageWrapper
            url={url}
            width={420}
            height={420}
            name={name as string}
          />
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
