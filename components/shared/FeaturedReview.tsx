import styled from 'styled-components';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

const FeaturedReview = ({
  name,
  quote,
}: {
  name: string | undefined;
  quote: any;
}) => (
  <div className="bg-forrest py-12 lg:mb-12">
    {name && quote && (
      <>
        <p className="text-white font-serif italic font-bold text-center text-5xl mb-12">
          Client Review
        </p>
        <div className="px-12 py-8 lg:py-0 lg:px-48">
          <Message>{documentToReactComponents(quote?.json)}</Message>
          <Name id="contact">
            - <p>{name}</p>
          </Name>
        </div>
      </>
    )}
  </div>
);

const Message = styled.span`
  p {
    font-size: 2.3rem;
    line-height: 1.2;
    color: #ffffff;
    font-family: 'Playfair Display', serif;
    text-align: center;
    font-weight: 400;
    font-style: italic;
  }
`;

const Name = styled.span`
  p::before {
    content: '- ';
  }
  p {
    font-size: 2rem;
    line-height: 1.1;
    color: #ffffff;
    font-family: 'Playfair Display', serif;
    font-weight: 700;
    text-align: right;
    margin-top: 0;
  }
`;

export default FeaturedReview;
