import { DECREASE_COUNT, INCREASE_COUNT } from "../reducers/unreadCountSlice";

export const increaseUnreadCount = (dispatch, count) => {
  dispatch(INCREASE_COUNT(count));
};

export const decreaseUnreadCount = (dispatch, count) => {
  dispatch(DECREASE_COUNT(count));
};

export const setUnreadCount = (dispatch, count) => {
  dispatch(setUnreadCount(count));
};
