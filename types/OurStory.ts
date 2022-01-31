import { RichTextBlock } from 'prismic-reactjs';

import { Seo } from './SEO';

export interface TOurStory {
  seo: Seo;
  title: string;
  pageContent: RichTextBlock[];
  banner_image?: string;
}
