import { RichTextBlock } from 'prismic-reactjs';
export interface Banner {
  imageUrl: string;
  lineOne: string;
  lineTwo: string;
}

export interface FeaturedContent {
  imageUrl: string;
  header: RichTextBlock[];
  body: RichTextBlock[];
}

export interface BlockWidget {
  id?: number;
  description: string;
  title: RichTextBlock[];
  imageUrl: string | null;
}
