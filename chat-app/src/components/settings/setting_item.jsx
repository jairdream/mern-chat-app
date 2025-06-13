import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";

export const SettingItem = ({ icon, label, iconColor, onClick, active }) => {
  const [isActive, setIsActive] = useState(active);

  return (
    <div
      className={`flex items-center w-full p-[5px_10px_5px_10px] rounded-lg  cursor-pointer mt-2 hover:bg-[#ffffff30] ${
        isActive ? "bg-[#0069af98]" : "bg-[#ffffff09]"
      }`}
      onClick={onClick}
    >
      <div
        className={`w-[50px] h-[50px] flex justify-center items-center  rounded-md me-4 ${
          iconColor ? iconColor : "bg-[#4fac68]"
        }`}
      >
        <FontAwesomeIcon
          icon={icon}
          color="#ffffff"
          fontSize={20}
          strokeWidth={3}
        />
      </div>
      <span className="text-xl font-semibold">{label}</span>
    </div>
  );
};
