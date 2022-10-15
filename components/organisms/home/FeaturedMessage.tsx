import ImageWrapper from 'components/atoms/ImageWrapper';
import React from 'react';
import styled from 'styled-components';

interface Props {
  imageUrl: string | undefined;
  header: string | undefined;
  body: string | undefined;
}
const FeaturedMessage = ({ imageUrl, header, body }: Props) => (
  <div className="flex flex-col my-24 mx-0 lg:flex-row lg:justify-between">
    <TextContainer>
      <h2>{header}</h2>
      <p>{body}</p>
    </TextContainer>
    <ImageWrapper
      src={imageUrl as string}
      width={450}
      height={450}
      alt="Unleashed Potential"
    />
  </div>
);

const TextContainer = styled.div`
  text-align: center;
  max-width: 600px;

  h2:first-child {
    font-size: 2.2rem;
    line-height: 1;
    font-weight: bold;
    font-family: 'Playfair Display';
    font-style: italic;
    color: #31464b;
    margin-bottom: 16px;
  }

  p {
    font-size: 1.5rem;
    line-height: 1.2;
    color: #31464b;
    margin-bottom: 16px;
    margin-top: 32px;
  }
`;

export default FeaturedMessage;
