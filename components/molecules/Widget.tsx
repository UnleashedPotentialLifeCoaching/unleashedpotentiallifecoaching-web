import ImageWrapper from 'components/atoms/ImageWrapper';
import styled from 'styled-components';
import { RichText, RichTextBlock } from 'prismic-reactjs';

interface Props {
  description: string;
  title: RichTextBlock[];
  imageUrl: string | null;
}

const Widget = ({ description, title, imageUrl }: Props) => {
  const altText: string = title[0].text ? title[0].text : 'widget';
  const srcUrl: string = imageUrl ? imageUrl : '';

  return (
    <div className="flex flex-col mb-32 p-4 lg:flex-row lg:justify-between lg:p-0 lg:odd:flex-row-reverse">
      <ImageWrapper src={srcUrl} width={525} height={525} alt={altText} />
      <div style={{ maxWidth: '500px' }} className="my-24 mx-0">
        <Header>
          <RichText render={title} />
        </Header>
        <p className="text-xl text-forrest my-6">{description}</p>
      </div>
    </div>
  );
};

const Header = styled.div`
  h3 {
    font-size: 2rem;
    line-height: 1.2;
    color: rgb(80, 105, 103);
    font-family: 'Playfair Display', serif;
    font-style: italic;
    text-shadow: rgb(0 0 0 / 40%) 0px 4px 4px;
  }
`;

export default Widget;
