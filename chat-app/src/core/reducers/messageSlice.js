import { createSlice } from "@reduxjs/toolkit";

const messageSlice = createSlice({
  name: "messages",
  initialState: { messages: [], editing: {} },
  reducers: {
    ADD_NEW_MESSAGE: (state, action) => {
      state.messages = [...state.messages, action.payload];
    },
    SET_LAST_MESSGE: (state, action) => {
      if (!state.messages[state.messages.length - 1]) {
        window.location.reload();
        return;
      }

      state.messages[state.messages.length - 1].chat = [
        ...state.messages[state.messages.length - 1].chat,
        action.payload,
      ];
    },
    SET_MESSAGE_HISTORIES: (state, action) => {
      state.messages = action.payload;
    },
    UPDATE_CHAT_STATUS: (state, action) => {
      const { chatId, newStatus } = action.payload; // Destructure payload
      // Find the message containing the chat with the given chatId
      for (let message of state.messages) {
        const chat = message.chat?.find((chat) => chat.id == chatId);
        if (chat) {
          chat.status = newStatus; // Update the status
          break; // Exit loop once found
        }
      }
    },
    UPDATE_MESSAGE: (state, action) => {
      const { id } = action.payload;
      for (let message of state.messages) {
        let updattedFlag = false;
        if (message.chat)
          for (let chat of message.chat) {
            if (chat.id === id) {
              updattedFlag = true;
              if (chat.content) state.editing = chat;
              break;
            }
          }
        if (updattedFlag) break;
      }
    },
    CANCEL_UPDATE: (state, action) => {
      state.editing = {};
    },
    SAVE_MESSAGE: (state, action) => {
      const { id, content, files } = action.payload;
      state.editing = {};
      for (let message of state.messages) {
        let updattedFlag = false;
        if (message.chat)
          for (let chat of message.chat) {
            if (chat.id === id) {
              updattedFlag = true;
              chat.content = content;
              chat.files = files;
              break;
            }
          }
        if (updattedFlag) break;
      }
    },
  },
});

export const {
  SET_LAST_MESSGE,
  ADD_NEW_MESSAGE,
  SET_MESSAGE_HISTORIES,
  UPDATE_CHAT_STATUS,
  UPDATE_MESSAGE,
  CANCEL_UPDATE,
  SAVE_MESSAGE,
} = messageSlice.actions;

export default messageSlice.reducer;
