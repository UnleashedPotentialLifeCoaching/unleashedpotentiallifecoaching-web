import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import styled from 'styled-components';

interface Props {
  name: string;
  quote: any;
}

const ReviewBlock = ({ name, quote }: Props) => (
  <div
    className="flex flex-col justify-center items-end mb-24"
    style={{ maxWidth: '520px' }}
  >
    <Quote>{documentToReactComponents(quote?.json)}</Quote>
    <Name>
      <h5>{name}</h5>
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
    margin-top: 8px;
  }
`;

export default ReviewBlock;
