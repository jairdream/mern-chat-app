import { baseURL, urls } from "../../utils/config";
import {
  chatFormat,
  getTimeOnly,
  isMoreThanOneHour,
} from "../../utils/formmaters";
import axios from "../axiosConfig";
import {
  ADD_NEW_MESSAGE,
  SAVE_MESSAGE,
  SET_LAST_MESSGE,
  SET_MESSAGE_HISTORIES,
  UPDATE_CHAT_STATUS,
  UPDATE_MESSAGE,
} from "../reducers/messageSlice";
import { SEARCH_USER, UPDATE_LAST_MESSAGE } from "../reducers/userSlice";
import { decreaseUnreadCount } from "./faviBadge_action";

export const sendNewMessage = (history, user, newMessage, dispatch) => {
  const lastMessage = history[history.length - 1];
  const moreOneHour = isMoreThanOneHour(new Date(), lastMessage?.updatedAt);
  dispatch(UPDATE_LAST_MESSAGE({ lastMsg: newMessage, id: user._id }));
  if ((lastMessage && lastMessage.user != user._id) || moreOneHour) {
    dispatch(
      ADD_NEW_MESSAGE({
        user: user,
        name: user.name,
        updatedAt: new Date().toISOString(),
        chat: [
          {
            content: newMessage.content,
            file: newMessage.files,
            status: 1,
            time: getTimeOnly(new Date()),
            id: newMessage._id,
          },
        ],
      })
    );
  } else {
    dispatch(
      SET_LAST_MESSGE({
        content: newMessage.content,
        file: newMessage.files,
        status: 1,
        time: getTimeOnly(new Date()),
        id: newMessage._id,
      })
    );
  }
};

export const recieveNewMessage = (histories, newMessage, dispatch) => {
  const lastMessage = histories[histories.length - 1];
  const moreOneHour = isMoreThanOneHour(
    new Date(newMessage.sendAt),
    lastMessage?.updatedAt
  );

  if (
    (lastMessage && lastMessage.user != newMessage.sender._id) ||
    moreOneHour
  ) {
    dispatch(
      ADD_NEW_MESSAGE({
        user: newMessage.sender._id,
        name: newMessage.sender.name,
        updatedAt: new Date().toISOString(),
        chat: [
          {
            content: newMessage.content,
            file: newMessage.files,
            status: 1,
            time: getTimeOnly(new Date()),
            id: newMessage._id,
          },
        ],
      })
    );
  } else {
    dispatch(
      SET_LAST_MESSGE({
        content: newMessage.content,
        file: newMessage.files,
        status: 1,
        time: getTimeOnly(new Date()),
        id: newMessage._id,
      })
    );
  }
};

export const getMessagesOnChannel = async (channelId, dispatch) => {
  const chats = await axios.get(
    `${baseURL + urls.chat_history_get_on_channel + channelId + "/"}`
  );
  const formattedChats = await chatFormat(chats.data);
  dispatch(SET_MESSAGE_HISTORIES(formattedChats));
};

export const changeStatus = async (dispatch, chatId, status) => {
  const result = await axios.post(`${urls.chat_read}`, {
    ids: [chatId],
  });
  dispatch(UPDATE_CHAT_STATUS({ chatId, newStatus: status }));
  decreaseUnreadCount(dispatch, 1);
};

export const searchMessage = async (dispatch, term) => {
  try {
    const result = await axios.get(`${urls.chat_search}${term}`);
    dispatch(SEARCH_USER(result.data));
  } catch (e) {
    console.log(e);
    return [];
  }
};

export const editMessage = async (dispatch, id) => {
  try {
    dispatch(UPDATE_MESSAGE({ id: id }));
  } catch (e) {
    console.log(e);
  }
};

export const saveMessage = async (dispatch, id, content, files, channelId) => {
  try {
    const result = await axios.put(`${urls.chat_update}${id}`, {
      content,
      files: files,
      channelId,
    });
    dispatch(SAVE_MESSAGE({ id, content, files }));
  } catch (e) {
    console.log(e);
  }
};
