import React from 'react';

interface Props {
  setTriggerNextPage: (e: boolean) => void;
  setTriggerPrevPage: (e: boolean) => void;
  prevPageToken: string;
  nextPageToken: string;
}
const ButtonGroup = ({
  setTriggerNextPage,
  setTriggerPrevPage,
  prevPageToken,
  nextPageToken,
}: Props) => {
  return (
    <div className="w-full flex flex-col sm:flex-row sm:justify-between my-6">
      <button
        onClick={() => setTriggerPrevPage(true)}
        className={` ${
          !Boolean(prevPageToken) ? 'opacity-25' : ''
        } mb-4 sm:mb-0 font-bold w-24  text-center py-3 rounded bg-forrest text-white`}
      >
        Previous 
      </button>
      <button
        onClick={() => setTriggerNextPage(true)}
        className={` ${
          !Boolean(nextPageToken) ? 'opacity-25' : ''
        } mb-4 sm:mb-0 font-bold w-24  text-center py-3 rounded bg-forrest text-white`}
      >
        Next 
      </button>
    </div>
  );
};

export default ButtonGroup;
