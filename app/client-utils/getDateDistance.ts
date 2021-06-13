/**
 * human-enjoyable date difference function
 */
const getDateDistance = (date1?: Date, date2?: Date): string => {
  if (!date1 || !date2) {
    return "";
  }

  const diff = Math.abs(date1.valueOf() - date2.valueOf());
  let distance = "";

  // less than 15 seconds "a moment ago"
  if (diff < 1000 * 15) {
    distance = "A moment ago";
    // less than a minute shows seconds
  } else if (diff < 1000 * 60) {
    const seconds = Math.floor(diff / 1000);
    distance = `${seconds} seconds ago`;
    // less than an hour
  } else if (diff < 1000 * 60 * 60) {
    const minutes = Math.floor(diff / (1000 * 60));
    distance = `${minutes} minute${minutes === 1 ? "" : "s"} ago`;
    // less than a day
  } else if (diff < 1000 * 60 * 60 * 24) {
    const hours = Math.floor(diff / (1000 * 60 * 60));
    distance = `${hours} hour${hours === 1 ? "" : "s"} ago`;
    // less than a week
  } else if (diff < 1000 * 60 * 60 * 24 * 7) {
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    distance = `${days} day${days === 1 ? "" : "s"} ago`;
    // less than a month
  } else if (diff < 1000 * 60 * 60 * 24 * 30) {
    const weeks = Math.floor(diff / (1000 * 60 * 60 * 24 * 7));
    if (weeks === 1) {
      distance = `It's been... one week`;
    } else {
      distance = `${weeks} weeks ago`;
    }
    // less than a year
  } else if (diff < 1000 * 60 * 60 * 24 * 365) {
    const avgDaysInMonth = 365 / 12;
    const months = Math.floor(diff / (1000 * 60 * 60 * 24 * avgDaysInMonth));
    distance = `${months} month${months === 1 ? "" : "s"} ago`;
  } else {
    // years
    const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365));
    distance = `${years} year${years === 1 ? "" : "s"} ago`;
  }

  return distance;
};

export default getDateDistance;
