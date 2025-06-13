import { useSettingsHandler } from "./settings_handler";
import { useSelector } from "react-redux";

export const Settings = ({ toggleView }) => {
  const { handleSettingRouter } = useSettingsHandler();
  const auth = useSelector((state) => state.auth.detail);
  return (
    <div className="backdrop-blur-md bg-[#000000b0] fixed top-0 left-0 w-[100vw] h-[100vh] z-[1000] flex justify-center items-center">
      <div
        className="w-full h-full absolute top-0 left-0"
        onClick={() => {
          toggleView();
        }}
      ></div>
      <div className="relative grow rounded-[20px] flex justify-center  min-w-[300px] h-[80%]  w-full max-[780px]:w-full max-[780px]:h-full">
        {handleSettingRouter(toggleView)}
      </div>
    </div>
  );
};
