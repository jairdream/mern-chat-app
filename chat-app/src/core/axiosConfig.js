// axiosConfig.js
import axios from "axios";
import { baseURL } from "../utils/config";

// Set the base URL
axios.defaults.baseURL = baseURL;

// Set default headers
axios.defaults.headers.common["Content-Type"] = "application/json";

export const setAuthorizationToken = (token) => {
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
};

export default axios;
