import io from "socket.io-client";
import { baseURL, urls } from "../../utils/config";
import { useEffect, useRef, useState } from "react";
import axios from "../axiosConfig";
import { changeStatus } from "../actions/message_actions";
import { useDispatch } from "react-redux";
import { UPDATE_CHAT_STATUS } from "../reducers/messageSlice";

const socket = io(baseURL);

export const useSocket = () => {
  const [id, setId] = useState();
  const [currentChannelId, setCurrentChannelId] = useState();
  const [messages, setMessages] = useState();
  const [isConnected, setIsConnected] = useState();
  const [isTyping, setIsTyping] = useState(false);
  const socketRef = useRef(socket);
  const dispatch = useDispatch();

  useEffect(() => {
    const handleConnect = () => {
      setIsConnected(true);
    };

    const handleDisconected = () => {
      setIsConnected(false);
    };

    const handleMessage = (message) => {
      setMessages(message);
    };

    const handleReadMessage = (data) => {
      dispatch(UPDATE_CHAT_STATUS({ chatId: data.id, newStatus: 0 }));
    };
    // Socket Handlers=========================
    socketRef.current.on("connected", handleConnect);
    socketRef.current.on("disconnect", handleDisconected);
    socketRef.current.on("message recieved", handleMessage);
    socketRef.current.on("typing", () => {
      console.log("comming soon");
      setIsTyping(true);
    });
    socketRef.current.on("stop typing", () => setIsTyping(false));
    socketRef.current.on("message viewed", handleReadMessage);
    // ========================================
    return () => {
      socketRef.current.off("connect", handleConnect);
      socketRef.current.off("disconnect", handleDisconected);
      socketRef.current.off("message", handleMessage);
    };
  }, []);

  const SET_USERId = (id) => {
    setId(id);
    socketRef.current.emit("setup", { _id: id });
  };

  const setChannelId = (channelId) => {
    setCurrentChannelId(channelId);
    socketRef.current.emit("join channel", channelId);
  };

  const setTypingStatus = (typing) => {
    setIsTyping(typing);
    if (typing) socketRef.current.emit("typing", currentChannelId);
    else socketRef.current.emit("stop typing", currentChannelId);
  };

  const sendMessage = async (message) => {
    socketRef.current.emit("stop typing", currentChannelId);
    try {
      const { data } = await axios.post(`${urls.chat}`, {
        content: message.content,
        files: message.files.map((file) => file.fileId),
        channelId: currentChannelId,
      });
      socketRef.current.emit("new message", data);
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const readMessage = async (user, message) => {
    socketRef.current.emit("read message", {
      reciever: { _id: user },
      id: message,
    });
  };

  return {
    messages,
    isTyping,
    setTypingStatus,
    SET_USERId,
    setChannelId,
    sendMessage,
    readMessage,
  };
};
