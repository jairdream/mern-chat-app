import React, { useEffect } from "react";
import { Route, Navigate } from "react-router-dom";
import { checkCookie } from "../core/cookie_management";
import { useSelector } from "react-redux";

export const isAuthenticated = () => {
  try {
    const isExpired = checkCookie(true);
    return !isExpired;
  } catch (e) {
    console.log(e);
    return false;
  }
};

export const PrivateRoute = ({ element, ...rest }) => {
  const auth = useSelector((state) => state.auth.detail);
  return isAuthenticated() ? element : <Navigate to="/" />;
};
