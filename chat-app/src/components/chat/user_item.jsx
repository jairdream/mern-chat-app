import { useEffect, useState } from "react";
import { StarIcon } from "../icons/star_icon";
import { UserIcon } from "../icons/user_icon";
import { getUnreadCount, pinChannel } from "../../core/actions/channel_actions";
import {
  decreaseUnreadCount,
  increaseUnreadCount,
} from "../../core/actions/faviBadge_action";
import { useDispatch, useSelector } from "react-redux";
import { stateList } from "./state";

import { formatDate, timeDifference } from "../../utils/formmaters";
import { StarIconOutlined } from "../icons/start_icon_outlined";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBucket, faCartShopping } from "@fortawesome/free-solid-svg-icons";

export const UserItem = ({ value, onClick, channel, auth }) => {
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
  const [status, setStatus] = useState(
    channel?.latestMessage?.isViewed ? 0 : 2
  );
  const [isPinned, setIsPinned] = useState();

  const user = useSelector((state) => state.auth.detail);
  const dispatch = useDispatch();

  const handleClickPin = () => {
    pinChannel(dispatch, channel._id, user._id);
  };

  useEffect(() => {
    if (channel) {
      let userName = "";
      if (channel.users.length > 1) {
        userName = channel.users[0].isAdmin
          ? channel.users[1].name
          : channel.users[0].name;
      } else userName = channel.users[0].name;
      if (channel.isProductChannel) userName = "Product Channel";
      let lastMsg = "";
      if (channel.latestMessage) {
        lastMsg = channel.latestMessage?.content;
        if (channel.latestMessage.files?.length)
          lastMsg = "🗃️ " + (lastMsg ? "+ " + lastMsg : "");
        lastMsg =
          auth?._id === channel.latestMessage?.sender._id
            ? "You: " + lastMsg
            : channel.latestMessage?.sender.name + ": " + lastMsg;
      } else {
        let date = new Date(channel.createdAt);
        date = formatDate(date);
        lastMsg = `Joined on ${date}`;
      }
      let lastView = new Date(
        channel.latestMessage ? channel.latestMessage.sendAt : channel.createdAt
      );
      lastView = timeDifference(lastView, true);
      setName(userName);
      setLastMsg(lastMsg);
      setLastView(lastView);
    }
  }, [channel]);
  useEffect(() => {
    setBgIndex(Math.floor(Math.random() * 5));
    if (channel?._id) {
      setIsPinned(
        channel.pinnedUsers.includes(auth._id) || channel.isProductChannel
      );
      getUnreadCount(channel._id).then((count) => {
        setUnread(count);
        decreaseUnreadCount(dispatch, unread);
        increaseUnreadCount(dispatch, count);
      });
    }
  }, [channel, lastMsg]);

  const handleClick = () => {
    onClick(channel?._id);
    decreaseUnreadCount(dispatch, unread);
    setUnread(0);
  };
  return (
    <>
      <div
        onClick={() => handleClick()}
        className={`relative w-full p-3 mt-3 cursor-pointer rounded-[20px] flex ${
          value === channel?._id && "bg-[#2e343d]"
        } hover:bg-[#2e343d]`}
      >
        <div
          className={`rounded-[15px] p-2 me-[10px] relative min-w-[60px] w-[60px] h-[60px] flex items-center justify-center ${bgColor[bgIndex]}`}
        >
          {channel.isProductChannel ? (
            <FontAwesomeIcon icon={faCartShopping} fontSize={30} />
          ) : (
            <UserIcon />
          )}
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
            <div className="flex items-center">
              {unread != 0 && (
                <div className="bg-[#01aef7] rounded-full w-[25px] h-[25px] flex items-center justify-center">
                  {unread}
                </div>
              )}
              {isPinned ? (
                <div
                  className="ms-3 hover:bg-gray-100/20 rounded-full p-[2px]"
                  onClick={handleClickPin}
                >
                  <StarIcon />
                </div>
              ) : (
                <div
                  className="ms-3 hover:bg-gray-100/20 rounded-full p-[2px]"
                  onClick={handleClickPin}
                >
                  <StarIconOutlined />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
