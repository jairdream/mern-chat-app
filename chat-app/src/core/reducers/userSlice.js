import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: { details: [], filteredUsers: [] },
  reducers: {
    SET_USER: (state, action) => {
      state.details = action.payload.data;
      sortState(state.details, action.payload.id);
    },
    UPDATE_LAST_MESSAGE: (state, action) => {
      const { lastMsg, id } = action.payload;
      for (let channel of state.details) {
        if (channel._id == lastMsg.channel._id) {
          channel.latestMessage = lastMsg;
          channel.updatedAt = lastMsg.sendAt;
          break;
        }
      }
      sortState(state.details, id);
    },
    UPDATE_USER: (state, action) => {
      const { data, id } = action.payload;
      for (let user of state.details) {
        if (user._id === data._id) {
          user.pinnedUsers = data.pinnedUsers;
        }
      }
      sortState(state.details, id);
    },
    RESORT_USER: (state, action) => {
      sortState(state.details, action.payload);
    },
    SEARCH_USER: (state, action) => {
      state.filteredUsers = action.payload;
    },
  },
});

const sortState = (state, id) => {
  state.sort((a, b) => {
    let aTime = new Date(a.latestMessage?.sendAt).getTime();
    let bTime = new Date(b.latestMessage?.sendAt).getTime();
    return bTime - aTime;
  });
  state.sort((a, b) => {
    let PinA = a.pinnedUsers.includes(id) ? 1 : 0;
    let PinB = b.pinnedUsers.includes(id) ? 1 : 0;
    return PinB - PinA;
  });
  state.sort((a, b) => {
    let productA = a.isProductChannel ? 1 : 0;
    let productB = b.isProductChannel ? 1 : 0;
    return productB - productA;
  });
};

export const {
  SET_USER,
  UPDATE_LAST_MESSAGE,
  UPDATE_USER,
  SEARCH_USER,
  RESORT_USER,
} = userSlice.actions;

export default userSlice.reducer;
