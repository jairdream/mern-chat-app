import { baseURL, urls } from "../../utils/config";
import { checkCookie, deleteCookie, setCookie } from "../cookie_management";
import axios, { setAuthorizationToken } from "../axiosConfig";
export const register = async (credential) => {
  const result = await axios.post(`${baseURL + urls.auth_register}`, {
    ...credential,
  });
  if (result.status == 201) {
    setCookie(result.data.token, result.data.refreshToken);
  }
  return result;
};

export const verify = async (codes) => {
  const result = await axios.post(`${urls.auth_verify}`, {
    code: codes,
  });
  return result;
};

export const resendVerificationCode = async () => {
  const result = await axios.post(`${urls.auth_resend}`);
  console.log(result);
};

export const login = async (credential) => {
  const result = await axios.post(`${baseURL + urls.auth_login}`, {
    ...credential,
  });
  setCookie(result.data.token, result.data.refreshToken);
  return result.data;
};

export const logout = async () => {
  deleteCookie();
  setAuthorizationToken();
  window.location.href = "/";
};

export const getAuth = async () => {
  try {
    const token = checkCookie(false);
    if (token) {
      const result = await axios.get(`${baseURL + urls.auth_get}${token.id}`);
      return result.data;
    }
  } catch (e) {
    console.log(e);
    return null;
  }
  return null;
};
