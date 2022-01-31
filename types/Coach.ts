import { RichTextBlock } from 'prismic-reactjs';

import { Seo } from './SEO';

export interface Coach {
  id?: number;
  seo?: Seo;
  name: string;
  image: {
    src: string;
    width: string | number;
    height: string | number;
    alt: string;
  };
  bookTimeImage?: {
    src: string;
    width: string | number;
    height: string | number;
    alt: string;
  };
  calendarUrl?: string;
  welcomeMessage?: RichTextBlock[];
  biography?: RichTextBlock[];
}
