import { Coach } from 'types/Coach';
import { Review } from 'types/Review';

export const urlify = (str: string): string =>
  str.replace(/\s+/g, '-').toLowerCase();

export const formatReview = (review: any): Review => review
    .filter((review: any) => review.node.featured === true)
    .map(({ node }: { node: any }) => ({
      featured: node.featured,
      name: node.name[0].text,
      quote: node.quote,
    }))[0];

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

// time conversion
export const convertTime = (time: string): string | undefined => {
  const timeArr = time.split(':'); // convert to array

  // fetch
  var hours = Number(timeArr[0]);
  var minutes = Number(timeArr[1]);

  // calculate
  let timeValue;

  if (hours > 0 && hours <= 12) {
    timeValue = "" + hours;
  } else if (hours > 12) {
    timeValue = "" + (hours - 12);
  } else if (hours == 0) {
    timeValue = "12";
  }

  timeValue += (minutes < 10) ? ":0" + minutes : ":" + minutes; // get seconds
  timeValue += (hours >= 12) ? " P.M." : " A.M.";  // get AM/PM
  return timeValue;
}

// date conversion
export const formatDate = (date: string): string | undefined => {
  const dateObj = new Date(date);
  const month = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const results = `${month[dateObj.getMonth()]} ${dateObj.getDate()}, ${dateObj.getFullYear()}`;

  return results;
}
