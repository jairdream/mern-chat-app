import { useEffect } from "react";

export const useFaviconBadge = () => {
  const favicon = document.querySelector("favicon-badge");
  const setFaviBadge = (value) => {
    favicon.badge = value;
  };

  const clearFaviBadge = () => {
    favicon.badge = false;
  };
  const getFaviBadge = () => {
    return favicon.badge;
  };

  return { setFaviBadge, clearFaviBadge, getFaviBadge };
};
