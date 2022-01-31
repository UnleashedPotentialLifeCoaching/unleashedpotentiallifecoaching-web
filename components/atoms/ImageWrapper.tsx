/* eslint-disable jsx-a11y/alt-text */
import Image from 'next/image';
import React from 'react';

interface Props {
  src: string;
  width: number | string;
  height: number | string;
  radius?: number | string;
  alt: string;
}

const ImageWrapper = ({ src, width, height, alt }: Props) => {
  const imageProps = { src, width, height, alt };
  return (
    <div>
      <Image {...imageProps} layout="intrinsic" className="rounded z-20" />
    </div>
  );
};

export default ImageWrapper;
