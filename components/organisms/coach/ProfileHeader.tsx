import { useState } from 'react';
import dynamic from 'next/dynamic';
import { RichText, RichTextBlock } from 'prismic-reactjs';
import styled from 'styled-components';
import Button from 'components/atoms/Button';
import ImageWrapper from 'components/atoms/ImageWrapper';

const BookTimeUp = dynamic(() => import('components/shared/BookTimePopup'));

interface Props {
  name: string;
  image: {
    src: string;
    width: string | number;
    height: string | number;
    alt: string;
  };
  welcomeMessage?: RichTextBlock[];
}

const ProfileHeader = ({ name, image, welcomeMessage }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const firstName = name.split(' ')[0];

  return (
    <div className="lg:flex lg:flex-row lg:justify-start">
      <ImageWrapper {...image} />
      <div className="flex flex-col mw-full m-2 lg:w-3/5 lg:mx-12">
        <h1 className="text-forrest text-3xl mt-0 font-bold mb-4">
          Hi, I&apos;m {firstName}
        </h1>
        <Details>
          <RichText render={welcomeMessage} />
        </Details>
        <div className="w-full lg:w-80">
          <Button handlePress={() => setIsOpen(!isOpen)} label="Book" />
          <BookTimeUp open={isOpen} setOpen={setIsOpen} />
        </div>
      </div>
    </div>
  );
};

const Details = styled.div`
  margin-top: 0;
  font-size: 1.25rem;
  line-height: 1.75rem;
  color: #506967;
  margin-bottom: 24px;
  font-size: 1.2rem;
`;

export default ProfileHeader;
