import { useEffect, useState } from "react";
import { StarIcon } from "../icons/star_icon";
import { UserIcon } from "../icons/user_icon";
import { getUnreadCount, pinChannel } from "../../core/actions/channel_actions";
import {
  decreaseUnreadCount,
  increaseUnreadCount,
} from "../../core/actions/faviBadge_action";
import { useDispatch } from "react-redux";
import { stateList } from "./state";

import { formatDate, timeDifference } from "../../utils/formmaters";
import { StarIconOutlined } from "../icons/start_icon_outlined";

export const SearchUserItem = ({ value, onClick, auth, message }) => {
  const bgColor = [
    "bg-[#abd1fb]",
    "bg-[#ffcda3]",
    "bg-[#4fac68]",
    "bg-[#cc423f]",
    "bg-[#fee6a8]",
  ];

  const [bgIndex, setBgIndex] = useState(0);
  const [name, setName] = useState("");
  const [lastMsg, setLastMsg] = useState("");
  const [lastView, setLastView] = useState("");
  const [unread, setUnread] = useState(0);
  const [status, setStatus] = useState(message.isViewed ? 0 : 2);

  useEffect(() => {
    let userName = message.channel.users[0].isAdmin
      ? message.channel.users[1].name
      : message.channel.users[0].name;
    let lastMsg = "";
    lastMsg = message?.content;
    if (message.files?.length)
      lastMsg = "🗃️ " + (lastMsg ? "+ " + lastMsg : "");
    lastMsg =
      auth?._id === message?.sender._id
        ? "You: " + lastMsg
        : message?.sender.name + ": " + lastMsg;

    let lastView = new Date(
      message ? message.sendAt : message.channel.createdAt
    );
    lastView = timeDifference(lastView);
    setName(userName);
    setLastMsg(lastMsg);
    setLastView(lastView);
  }, [message]);
  useEffect(() => {
    setBgIndex(Math.floor(Math.random() * 5));
  }, []);

  const handleClick = () => {
    onClick(message._id, message.channel._id);
  };
  return (
    <>
      <div
        onClick={() => handleClick()}
        className={`relative w-full p-3 mt-3 cursor-pointer rounded-[20px] flex ${
          value === message._id && "bg-[#2e343d]"
        } hover:bg-[#2e343d]`}
      >
        <div
          className={`rounded-[15px] p-2 me-[10px] relative min-w-[60px] w-[60px] h-[60px] flex items-center justify-center ${bgColor[bgIndex]}`}
        >
          <UserIcon />
        </div>
        <div
          className="flex flex-col grow justify-between h-full relative "
          style={{ width: "calc(100% - 70px)" }}
        >
          <div className="flex w-full justify-between">
            <div>{name}</div>
            <div className="flex items-center">
              <div>{stateList[status]}</div>
              <div className="ms-3">{lastView}</div>
            </div>
          </div>
          <div className="relative flex justify-between">
            <div
              className="text-[#a5abb2]"
              style={{ width: "calc(100% - 70px)" }}
            >
              <div className="truncate">{lastMsg}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
