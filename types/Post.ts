import {RichTextBlock} from "prismic-reactjs";

interface Image  {
    dimensions: {
      width: string;
      height: string;
    }
    alt: null;
    copyright: null;
    url: string;
  }

export interface Post {
  sub_title: RichTextBlock[];
  featured_image: Image;
  post_title: RichTextBlock[];
  post_content: RichTextBlock[];
  publish_data: string;
  seo_meta_title: string;
  seo_meta_description: string;
  author: {
    name: RichTextBlock[];
    profile_image: Image;
  }

}
