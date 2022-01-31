import { Seo } from './SEO';

export interface YTProps {
  id: {
    kind: string;
    videoId: string;
  };
  snippet: {
    title: string;
    description: string;
  };
}

export interface VIDEO_PROPS {
  description: string;
  title: string;
  url: string;
}

export interface PAGE {
  seo: Seo;
  banner_image?: string;
}
