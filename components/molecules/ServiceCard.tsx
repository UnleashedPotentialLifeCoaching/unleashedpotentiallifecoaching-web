import { useState } from 'react';
import dynamic from 'next/dynamic';
import Button from 'components/atoms/Button';
import Image from 'next/image';
import { Coach } from 'types/Coach';

const BookTimeUp = dynamic(() => import('components/shared/BookTimePopup'));

const ServiceCard = ({ name, image }: Coach) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mb-12 flex flex-col items-center justify-center space-y-4 lg:space-y-2 lg:flex-row">
      <div className="w-full sm:max-w-md lg:w-1/2 lg:inline ">
        <Image {...image} width={500} height={500} layout="intrinsic" />
      </div>
      <div className="bg-white shadow-xl rounded border z-30 w-full sm:max-w-md lg:-ml-12">
        <div className="mx-3 my-4 rounded border border-black lg:h-52">
          <p className="uppercase text-forrest text-base font-bold text-center mt-8">
            Online coaching with {name}
          </p>
          <p className="uppercase text-forrest-900 text-base font-bold text-center my-3">
            1 Hour
          </p>
          <div className="mx-auto text-center py-5">
            <Button handlePress={() => setIsOpen(!isOpen)} label="Book now" />
            <BookTimeUp open={isOpen} setOpen={setIsOpen} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
