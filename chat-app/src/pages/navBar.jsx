import { ChatIcon } from "../components/icons/chat_icon";
import { FolderIcon } from "../components/icons/folder_icon";
import { ScrewdriverIcon } from "../components/icons/screwdriver_icon";
import { BookmarkIcon } from "../components/icons/bookmark_icon";
import { MenuItem } from "../components/nav/menu_item";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Settings } from "./ChatPage/settingsModal/settings";

export const NavBar = () => {
  const unreadCount = useSelector((state) => state.unreadCount.count);
  const [active, setActive] = useState("");
  const [showSettings, setShowSettings] = useState(false);
  useEffect(() => {
    if (window.location.href.includes("chat")) setActive("all chats");
  }, []);
  return (
    <div className="grow flex flex-col mt-10 relative w-full px-2 h-full overflow-auto max-[780px]:mt-1">
      {showSettings && (
        <Settings
          toggleView={() => {
            setShowSettings(!showSettings);
          }}
        />
      )}
      <div className="max-[780px]:hidden block">
        <MenuItem
          label={"all chats"}
          icon={<ChatIcon />}
          badge={unreadCount}
          active={active}
        />
      </div>
      <div className="mt-20 mb-5 mx-3 border-b-[1px] border-white max-[780px]:mt-1"></div>
      <MenuItem
        label={"settings"}
        icon={<ScrewdriverIcon />}
        action={() => {
          setShowSettings(true);
        }}
      />
      {/* <MenuItem label={"saved"} icon={<BookmarkIcon />} /> */}
    </div>
  );
};
