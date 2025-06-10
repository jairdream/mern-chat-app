import Cookies from "js-cookie";
import { setAuthorizationToken } from "./axiosConfig";
export const setCookie = (accessToken, refreshToken) => {
  Cookies.set("accessToken", accessToken, {
    expires: 1,
    secure: true,
    sameSite: "Strict",
  });
  Cookies.set("refreshToken", refreshToken, {
    expires: 1,
    secure: true,
    sameSite: "Strict",
  });
  setAuthorizationToken(accessToken);
};

export const deleteCookie = () => {
  Cookies.remove("accessToken");
  Cookies.remove("refreshToken");
};

export const getCookie = (name) => {
  const value = Cookies.get(name);
  return value;
};

export const checkCookie = (flag) => {
  const token = Cookies.get("accessToken");

  setAuthorizationToken(token);
  // Split the JWT into its parts
  const parts = token?.split(".");

  if (parts.length !== 3) {
    throw new Error("Invalid JWT format");
  }

  // Decode the payload (the second part)
  const payload = JSON.parse(atob(parts[1]));

  // Check for the 'exp' claim
  if (!payload.exp) {
    throw new Error("No expiration claim found in the token");
  }

  // Get the current time in seconds
  const currentTime = Math.floor(Date.now() / 1000);

  if (flag)
    // Check if the token is expired
    return payload.exp < currentTime;
  else if (payload.exp >= currentTime) return payload;
  else return null;
};
