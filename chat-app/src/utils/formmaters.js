import { baseURL } from "./config";

export const formatDate = (date) => {
  const monthLabel = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const day = date.getDate(); // Get the day of the month (1-31)
  const month = date.getMonth(); // Get the month (0-11, so add 1)
  const year = date.getFullYear(); // Get the full year (e.g., 2025)

  return `${day} of ${monthLabel[month]}, ${year}`;
};

export const timeDifference = (specificDate, checkDate) => {
  const now = new Date();
  const targetDate = new Date(specificDate);

  // Check if the specific date is today
  const isToday = now.toDateString() === targetDate.toDateString();

  if (!checkDate && isToday) {
    const diffMs = now - targetDate; // Difference in milliseconds
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const hours = Math.floor(diffMins / 60);
    const minutes = diffMins % 60;
    if (hours !== 0) return `${hours} hr ${minutes} min ago`;
    else return `${minutes} min ago`;
  }

  // Check if it's within the week
  const startOfWeek = new Date(now);
  startOfWeek.setDate(now.getDate() - now.getDay()); // Set to the start of the week (Sunday)

  if (targetDate >= startOfWeek) {
    const dayDiff = Math.floor((now - targetDate) / (1000 * 60 * 60 * 24));

    switch (dayDiff) {
      case 0:
        return "Today";
      case 1:
        return "Yesterday";
      default:
        return `${dayDiff} days ago`;
    }
  }

  // If it's more than a week ago, return the specific date in "MM/DD/YYYY" format
  const options = { year: "numeric", month: "2-digit", day: "2-digit" };
  return targetDate.toLocaleDateString(undefined, options); // Format as MM/DD/YYYY
};

export const getTimeOnly = (specificDate) => {
  const date = new Date(specificDate);
  let hours = date.getHours();
  const minutes = date.getMinutes();

  const ampm = hours >= 12 ? "PM" : "AM"; // Determine AM or PM
  hours = hours % 12; // Convert to 12-hour format
  hours = hours ? hours : 12; // The hour '0' should be '12'
  const formattedMinutes = minutes < 10 ? "0" + minutes : minutes; // Add leading zero if needed

  return `${hours}:${formattedMinutes} ${ampm}`;
};

export const isMoreThanOneHour = (specificDate, originalTime) => {
  const now = new Date(originalTime);
  const targetDate = new Date(specificDate);

  // Calculate the difference in milliseconds
  const diffMs = now - targetDate;
  // Convert milliseconds to hours
  const diffHours = diffMs / (1000 * 60 * 60);

  // Check if the difference is greater than one hour
  return Math.abs(diffHours) > 1;
};

export const chatFormat = (history) => {
  let result = [];
  for (let i = 0; i < history.length; i++) {
    const tempChat = {
      time: getTimeOnly(history[i].sendAt),
      content: history[i].content,
      file: history[i].files,
      status: history[i].isViewed ? 0 : 2,
      id: history[i]._id,
    };
    let lastresult = result.slice(-1)[0];

    let lastChatDate = lastresult
      ? new Date(lastresult.updatedAt).toDateString()
      : null;
    let currentChatDate = new Date(history[i].sendAt).toDateString();
    if (
      result.length == 0 ||
      (lastresult && lastChatDate !== currentChatDate)
    ) {
      result.push({
        date: timeDifference(currentChatDate, true), // Add a date indicator
        isDateBreaker: true, // Flag to identify it as a date breaker
      });
    }
    if (
      lastresult &&
      lastresult.user._id === history[i].sender._id &&
      !isMoreThanOneHour(lastresult.updatedAt, history[i].sendAt)
    )
      result[result.length - 1].chat.push(tempChat);
    else
      result.push({
        chat: [tempChat],
        user: history[i].sender,
        name: history[i].sender.name,
        updatedAt: history[i].createdAt,
      });
  }
  return result;
};

export const assetsURLFormatter = (url) => {
  const currentLocation = window.location.pathname;
  let formattedURL = "";
  for (let i = 0; i < currentLocation.split("/").length - 1; i++)
    formattedURL += "../";
  formattedURL += url;
  return formattedURL;
};
