import { RichText, RichTextBlock } from 'prismic-reactjs';
import styled from 'styled-components';
import { Review } from 'types/Review';

const FeaturedReview = ({ name, quote }: Review) => (
  <div className="bg-forrest py-12 lg:mb-12">
    <p className="text-white font-serif italic font-bold text-center text-5xl mb-12">
      Client Love
    </p>
    <div className="px-12 py-8 lg:py-0 lg:px-48">
      <Message>
        <RichText render={quote} />
      </Message>
      <Name id="contact">
        - <p>{name}</p>
      </Name>
    </div>
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
