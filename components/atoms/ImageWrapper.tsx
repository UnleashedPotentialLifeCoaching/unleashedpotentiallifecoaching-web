/* eslint-disable jsx-a11y/alt-text */
import Image from 'next/image';
import React from 'react';

interface Props {
  url: string;
  width: number | string;
  height: number | string;
  radius?: number | string;
  name: string;
}

const ImageWrapper = ({ url, width, height, name }: Props) => {
  const imageProps = { url, width, height, name };
  return (
    <div>
      <Image
        src={url}
        alt={name}
        width={width}
        height={height}
        layout="intrinsic"
        className="rounded z-20"
      />
    </div>
  );
};

export default ImageWrapper;
