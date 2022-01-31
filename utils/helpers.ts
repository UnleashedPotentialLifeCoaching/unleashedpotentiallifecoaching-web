import { Coach } from 'types/Coach';
import { Review } from 'types/Review';

export const urlify = (str: string): string =>
  str.replace(/\s+/g, '-').toLowerCase();

export const formatReview = (review: any): Review => {
  return review
    .filter((review: any) => review.node.featured === true)
    .map(({ node }: { node: any }) => ({
      featured: node.featured,
      name: node.name[0].text,
      quote: node.quote,
    }))[0];
};

export const formatCoaches = (node: any): Coach => ({
  id: node.appearance_order,
  name: node.name[0].text,
  image: node.book_time_photo
    ? {
        src: node.book_time_photo.url,
        width: node.book_time_photo.dimensions.width,
        height: node.book_time_photo.dimensions.height,
        alt: node.name[0].text,
      }
    : {
        src: node.profile_image.url,
        width: node.profile_image.dimensions.width,
        height: node.profile_image.dimensions.height,
        alt: node.name[0].text,
      },
});

export const removeSlashFromSlug = (slug: string) => slug.replace('/', '');
