import { RichText, RichTextBlock } from 'prismic-reactjs';
import ContentWrapper from 'layouts/ContentWrapper';

interface Props {
  biography: RichTextBlock[] | undefined;
}
const Biography = ({ biography }: Props) => {
  return (
    <ContentWrapper>
      <RichText render={biography} />
    </ContentWrapper>
  );
};

export default Biography;
