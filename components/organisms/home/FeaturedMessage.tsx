import ImageWrapper from 'components/atoms/ImageWrapper';
import { RichText } from 'prismic-reactjs';
import React from 'react';
import styled from 'styled-components';
import { FeaturedContent } from 'types/Home';

const FeaturedMessage = ({ imageUrl, header, body }: FeaturedContent) => (
  <div className="flex flex-col my-24 mx-0 lg:flex-row lg:justify-between">
    <TextContainer>
      <RichText render={header} />
      <RichText render={body} />
    </TextContainer>
    <ImageWrapper
      src={imageUrl}
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
