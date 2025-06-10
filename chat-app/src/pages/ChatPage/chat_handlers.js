import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useSocket } from "../../core/socket";
import { uploadFile } from "../../core/actions/file_action";
import {
  SEARCH_USER,
  UPDATE_LAST_MESSAGE,
} from "../../core/reducers/userSlice";
import { startNotification } from "../../utils/notification";
import {
  getMessagesOnChannel,
  recieveNewMessage,
  saveMessage,
  searchMessage,
  sendNewMessage,
} from "../../core/actions/message_actions";
import { getChannel } from "../../core/actions/channel_actions";
import axios from "axios";
import { urls } from "../../utils/config";
import { SELETE_USER } from "../../core/reducers/authSlice";

export const useChatHandlers = (setShowUsers) => {
  const [files, setFiles] = useState([]);
  const [tryDrop, setTryDrop] = useState(false);
  const [selectedChannel, setSelectedChannel] = useState(null);
  const [content, setContent] = useState("");
  const [clickedSEARCH_USER, setClickedSEARCH_USER] = useState("");

  const auth = useSelector((state) => state.auth.detail);
  const histories = useSelector((state) => state.messages.messages);
  const searchedUsers = useSelector((state) => state.users.filteredUsers);
  const users = useSelector((state) => state.users.details);
  const editingMessage = useSelector((state) => state.messages.editing);
  const selectedUser = useSelector((state) => state.auth.selected);
  const dispatch = useDispatch();
  const messageRefs = useRef({});
  const {
    isTyping,
    messages,
    sendMessage,
    setChannelId,
    setTypingStatus,
    SET_USERId,
  } = useSocket();

  // Handlers===================================================
  const handleChangeAssetsFile = async (event) => {
    const fileNames = files.map((file) => file.name);
    setTryDrop(false);
    const uploadedFileList = await uploadFile(Array.from(event.target.files));
    setFiles([
      ...files,
      ...uploadedFileList.filter((file) => !fileNames.includes(file.name)),
    ]);
    event.target.value = null;
  };
  const handleDeleteFile = (name) => {
    setFiles([...files.filter((item) => item.name != name)]);
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    setTryDrop(false);
    if (e.dataTransfer.files.length == 0) return;
    const fileNames = files.map((file) => file.name);
    const uploadedFileList = await uploadFile(Array.from(e.dataTransfer.files));
    console.log(uploadedFileList);
    setFiles([
      ...files,
      ...uploadedFileList?.filter((file) => !fileNames.includes(file.name)),
    ]);
  };
  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!tryDrop) setTryDrop(true);
  };
  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (tryDrop) setTryDrop(false);
  };
  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleClickChannel = async (id) => {
    setShowUsers(false);
    for (let channel of users) {
      if (channel._id == id) {
        if (channel.isProductChannel) {
          for (let user of channel.users) {
            console.log(user);
            if (user.isAdmin) {
              const result = await axios.get(`${urls.auth_get}${user._id}`);
              dispatch(SELETE_USER(result.data));
              break;
            }
          }
          break;
        } else {
          for (let user of channel.users) {
            if (!user.isAdmin) {
              const result = await axios.get(`${urls.auth_get}${user._id}`);
              dispatch(SELETE_USER(result.data));
              break;
            }
          }
          break;
        }
      }
    }
    setSelectedChannel(id);
    setChannelId(id);
    if (id && id != selectedChannel) {
      setTypingStatus(false);
      await getMessagesOnChannel(id, dispatch);
    }
  };

  const handleClickSearchedChannel = async (messageId, channelId) => {
    setShowUsers(false);
    await handleClickChannel(channelId);
    setClickedSEARCH_USER(messageId);
    messageRefs.current[messageId].scrollIntoView({ behavior: "smooth" });
  };

  const handleClickSendMsg = () => {
    if (editingMessage.content) {
      saveMessage(dispatch, editingMessage.id, content, files, selectedChannel);
      return;
    }
    const newMessage = {
      content,
      files: files,
      channelId: selectedChannel,
    };
    if (
      users.find((user) => user._id == selectedChannel).isProductChannel &&
      !auth.isAdmin
    )
      return;
    sendMessage(newMessage).then((data) => {
      sendNewMessage(histories, auth, data, dispatch);
      setContent("");
      setFiles([]);
    });
  };

  const handleSearch = (searchTerm) => {
    if (searchTerm == "") {
      dispatch(SEARCH_USER([]));
      setClickedSEARCH_USER("");
    } else searchMessage(dispatch, searchTerm);
  };
  const handlePaste = async (event) => {
    const items = event.clipboardData.items;
    let fileList = [];
    for (let i = 0; i < items.length; i++) {
      const item = items[i];

      // Check if the item is a file and is an image
      if (item.kind === "file" && item.type.startsWith("image/")) {
        const file = item.getAsFile();
        fileList.push(file);
      }
    }
    if (fileList.length > 0) {
      const fileNames = files.map((file) => file.name);
      const uploadedFileList = await uploadFile(Array.from(fileList));
      console.log(uploadedFileList);
      setFiles([
        ...files,
        ...uploadedFileList?.filter((file) => !fileNames.includes(file.name)),
      ]);
    }
  };

  const handleClickEditingMessage = () => {
    messageRefs.current[editingMessage.id].scrollIntoView({
      behavior: "smooth",
    });
  };

  useEffect(() => {
    if (auth)
      getChannel(dispatch, auth?._id).then(() => {
        SET_USERId(auth?._id);
      });
  }, [auth]);

  useEffect(() => {
    if (messages) {
      startNotification(messages);

      dispatch(UPDATE_LAST_MESSAGE({ lastMsg: messages }));
      if (messages.channel._id == selectedChannel) {
        recieveNewMessage(histories, messages, dispatch);
      }
    }
  }, [messages]);
  useEffect(() => {
    if (histories?.length > 0 && searchedUsers.length == 0) {
      const lastMsgId =
        histories[histories.length - 1].chat[
          histories[histories.length - 1].chat.length - 1
        ].id;
      messageRefs.current[lastMsgId].scrollIntoView({ behavior: "smooth" });
    }
  }, [histories]);
  useEffect(() => {
    if (editingMessage) {
      setContent(editingMessage.content);
    }
  }, [editingMessage]);

  return {
    files,
    isTyping,
    messages,
    content,
    auth,
    selectedChannel,
    selectedUser,
    histories,
    searchedUsers,
    messageRefs,
    tryDrop,
    users,
    clickedSEARCH_USER,
    editingMessage,
    setContent,
    setTypingStatus,
    SET_USERId,
    handleDragEnter,
    handleDragLeave,
    handleDragOver,
    handleDrop,
    handleSearch,
    handleClickChannel,
    handleClickSearchedChannel,
    handleChangeAssetsFile,
    handleDeleteFile,
    handleClickSendMsg,
    handlePaste,
    handleClickEditingMessage,
  };
};
