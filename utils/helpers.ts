export const urlify = (str: string): string =>
  str.replace(/\s+/g, '-').toLowerCase();

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
    timeValue = '' + hours;
  } else if (hours > 12) {
    timeValue = '' + (hours - 12);
  } else if (hours == 0) {
    timeValue = '12';
  }

  timeValue += minutes < 10 ? ':0' + minutes : ':' + minutes; // get seconds
  timeValue += hours >= 12 ? ' P.M.' : ' A.M.'; // get AM/PM
  return timeValue;
};

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
  const results = `${
    month[dateObj.getMonth()]
  } ${dateObj.getDate()}, ${dateObj.getFullYear()}`;

  return results;
};

export const organizeVideos = (videos: any) => {
  const results: any = [];

  for (let i = 0; i < videos?.pages?.length; i++) {
    const page = videos?.pages[i];

    for (let j = 0; j < page?.items.length; j++) {
      const item = page?.items[j];
      results.push(item);
    }
  }

  return results;
};
