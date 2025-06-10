import { useState } from "react";
import { About } from "./about";
import { Account } from "./account";
import { Customers } from "./customers";
import { Products } from "./products";
import { ConfirmDelete } from "./confirm_delete";
import { useSelector } from "react-redux";
import { Dashboard } from "./dashboard";

export const useSettingsHandler = () => {
  const [settingRouter, setSettingRouter] = useState("/");
  const auth = useSelector((state) => state.auth.detail);
  const handleSettingRouter = (closeAction) => {
    switch (settingRouter) {
      case "/account":
        return (
          <Account
            onBack={() => {
              setSettingRouter("/");
            }}
          />
        );
      case "/customers":
        return (
          <Customers
            onBack={() => {
              setSettingRouter("/");
            }}
          />
        );
      case "/products":
        return (
          <Products
            onBack={() => {
              setSettingRouter("/");
            }}
          />
        );
      case "/delete":
        return (
          <ConfirmDelete
            onBack={() => {
              setSettingRouter("/");
            }}
          />
        );
      case "/about":
        return (
          <About
            onBack={() => {
              setSettingRouter("/");
            }}
          />
        );
      default:
        return (
          <Dashboard
            setSettingRouter={setSettingRouter}
            settingRouter={setSettingRouter}
            onBack={() => {
              closeAction();
            }}
          />
        );
    }
  };

  return {
    settingRouter,
    setSettingRouter,
    handleSettingRouter,
  };
};
