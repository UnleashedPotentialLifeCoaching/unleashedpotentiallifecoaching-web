import { RichTextBlock } from 'prismic-reactjs';

export interface Review {
  featured?: boolean | null;
  name: RichTextBlock[];
  quote: RichTextBlock[];
}

export interface ReviewForm {
  fullName: string;
  email: string;
  phone: string;
  rating: string;
  explanation: string;
  improvements: string;
  recommend: string;
  comments: string;
}
