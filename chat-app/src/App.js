import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { SET_AUTH } from "./core/reducers/authSlice";
import { getAuth, logout } from "./core/actions/auth_action";

import "./App.css";
import { useFaviconBadge } from "./utils/faviconBadge";
import { Layout } from "./pages/ChatPage/layout";
import { Login } from "./pages/authPage/login";
import { Register } from "./pages/authPage/register";
import { NotFound } from "./pages/not_found";
import { PrivateRoute } from "./components/PrivateRoute";
import { Verify } from "./pages/authPage/verify";
import { isAuthenticated } from "./components/PrivateRoute";
import { ChatPage } from "./pages/ChatPage/chat_page";
import { Settings } from "./pages/ChatPage/settingsModal/settings";

function App() {
  const { setFaviBadge, clearFaviBadge, getFaviBadge } = useFaviconBadge();
  const dispatch = useDispatch();
  const unreadCount = useSelector((state) => state.unreadCount.count);
  const auth = useSelector((state) => state.auth.detail);

  useEffect(() => {
    getAuth()
      .then((data) => {
        dispatch(SET_AUTH(data));
      })
      .catch((e) => logout());
  }, []);

  useEffect(() => {
    console.log(auth);
    if (
      auth &&
      auth.isVerified &&
      isAuthenticated() &&
      !window.location.href.includes("chat")
    ) {
      window.location.href = "/chat";
    }
  }, [auth]);
  useEffect(() => {
    setFaviBadge(unreadCount);
    if (unreadCount == 0) clearFaviBadge();
    if ("Notification" in window) {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
        } else {
          console.log("Notification permission denied");
        }
      });
    } else {
      console.log("This browser does not support notifications");
    }
  }, [unreadCount]);
  return (
    <Router>
      <Routes>
        <Route
          path="/chat"
          element={
            <PrivateRoute element={<Layout children={<ChatPage />} />} />
          }
        />
        <Route path="/verify" element={<PrivateRoute element={<Verify />} />} />
        {/* <Route path="/verify" element={<Verify />} /> */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/not-found" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
