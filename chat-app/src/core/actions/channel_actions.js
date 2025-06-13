import axios from "../axiosConfig";
import { baseURL, urls } from "../../utils/config";
import { SET_USER, UPDATE_USER } from "../reducers/userSlice";

export const createChannel = async () => {
  const admin = await axios.get(`${urls.get_admin}`);
  const result = await axios.post(`${urls.channel_create}`, {
    userId: admin.data,
  });
  return result;
};

export const getChannel = async (dispatch, id) => {
  try {
    const channels = await axios.get(`${urls.channel_get}`);
    dispatch(SET_USER({ data: channels.data, id }));

    return [];
  } catch (e) {
    console.log(e);
    return [];
  }
};

export const getUnreadCount = async (channelId) => {
  try {
    const count = await axios.get(`${urls.channel_get_count}${channelId}`);
    return count.data;
  } catch (e) {
    console.log(e);
    return 0;
  }
};

export const pinChannel = async (dispatch, channelId, id) => {
  try {
    const result = await axios.post(`${urls.channel_pin}${channelId}`);
    dispatch(UPDATE_USER({ data: result.data, id }));
  } catch (e) {
    console.log(e);
    return null;
  }
};
