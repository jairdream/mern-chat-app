import {
  faArrowLeft,
  faCartShopping,
  faClose,
  faDeleteLeft,
  faQuestion,
  faSignOut,
  faToolbox,
  faTools,
  faUser,
  faUserMinus,
  faUsersBetweenLines,
  faUserSlash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SettingItem } from "../../../components/settings/setting_item";
import { logout } from "../../../core/actions/auth_action";
import { useSettingsHandler } from "./settings_handler";
import { useSelector } from "react-redux";

export const Dashboard = ({ settingRouter, setSettingRouter, onBack }) => {
  const auth = useSelector((state) => state.auth.detail);
  return (
    <div className="relative flex flex-col items-centerpr-3 p-[20px] bg-[#252933] rounded-[10px]  min-w-[300px] w-[550px] max-[780px]:w-full max-[780px]:h-full">
      <div className="w-full flex items-center mt-5 mb-5">
        <FontAwesomeIcon
          icon={faArrowLeft}
          className="cursor-pointer"
          onClick={onBack}
        />
        <span className="text-xl font-bold ms-3">SETTINGS</span>
      </div>
      <div className="flex items-center mb-3">
        <div className="w-[100px] h-[100px] rounded-full p-5 flex justify-center items-center bg-[#22b9ff]">
          <img src={`${auth.pic}`} className="rounded-full" />
        </div>
        <div className="ms-5 text-2xl font-semibold">
          <div>{auth.name}</div>
          <div>{auth.email}</div>
        </div>
      </div>

      <SettingItem
        icon={faQuestion}
        label={"About"}
        active={settingRouter == "/about"}
        onClick={() => {
          setSettingRouter("/about");
        }}
      />
      <SettingItem
        icon={faUser}
        label={"My Account"}
        active={settingRouter == "/account"}
        onClick={() => {
          setSettingRouter("/account");
        }}
      />
      {auth.isAdmin && (
        <>
          <SettingItem
            icon={faUsersBetweenLines}
            label={"Customers"}
            active={settingRouter == "/customers"}
            onClick={() => {
              setSettingRouter("/customers");
            }}
          />
          <SettingItem
            icon={faCartShopping}
            label={"Products"}
            active={settingRouter == "/products"}
            onClick={() => {
              setSettingRouter("/products");
            }}
          />
        </>
      )}
      <div className="grow flex flex-col-reverse">
        <SettingItem
          icon={faUserSlash}
          label={"Delete Account"}
          iconColor={"bg-[#ff1212]"}
          active={settingRouter == "/delete"}
          onClick={() => {
            setSettingRouter("/delete");
          }}
        />
        <SettingItem
          icon={faSignOut}
          label={"Sign Out"}
          iconColor={"bg-[#ff1212]"}
          onClick={logout}
        />
      </div>
    </div>
  );
};
