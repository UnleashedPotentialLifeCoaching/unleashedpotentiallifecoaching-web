import { RichTextBlock } from 'prismic-reactjs';

import { Seo } from './SEO';

export interface TServices {
  page_blocks: {
    section_content: RichTextBlock[];
    section_title: RichTextBlock[];
  }[];
  seo: Seo;
  banner_image?: string;
}
