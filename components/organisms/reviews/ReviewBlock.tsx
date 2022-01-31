import { RichText } from 'prismic-reactjs';
import styled from 'styled-components';
import { Review } from 'types/Review';

const ReviewBlock = ({ name, quote }: Review) => (
  <div
    className="flex flex-col justify-center items-end mb-24"
    style={{ maxWidth: '520px' }}
  >
    <Quote>
      <RichText render={quote} />
    </Quote>
    <Name>
      <RichText render={name} />
    </Name>
  </div>
);

const Quote = styled.span`
  p {
    font-size: 1.125rem;
    line-height: 1.75rem;
    color: #506967;
    margin: 0;
    padding: 0;
  }
`;

const Name = styled.div`
  h5 {
    &::before {
      content: '- ';
    }
    font-size: 1.125rem;
    line-height: 1.75rem;
    color: #506967;
    font-weight: bold;
  }
`;

export default ReviewBlock;
