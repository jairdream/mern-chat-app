import { urls } from "../../utils/config";
import axios from "../axiosConfig";
import {
  ADD_HISTORIES,
  CANCEL_UPDATE_PRODUCT,
  CREATE_PRODUCT,
  DELETE_PRODUCT,
  SAVE_PRODUCT,
  SET_HISTORIES,
  SET_PRODUCT,
} from "../reducers/productSlice";

export const createProduct = async (dispatch, value) => {
  try {
    const result = await axios.post(`${urls.PRODUCT_BASE}`, {
      ...value,
      content: "",
      files: [],
    });
    dispatch(CREATE_PRODUCT({ ...result.data }));
  } catch (e) {
    console.log(e);
  }
};

export const getProducts = async (dispatch) => {
  try {
    const result = await axios.get(`${urls.PRODUCT_BASE}`);
    dispatch(SET_PRODUCT(result.data));
  } catch (e) {
    console.log(e);
  }
};

export const deleteProduct = async (dispatch, id) => {
  try {
    const result = await axios.delete(`${urls.PRODUCT_BASE}${id}`);
    dispatch(DELETE_PRODUCT({ id }));
  } catch (e) {
    console.log(e);
  }
};

export const saveProduct = async (dispatch, id, newProduct) => {
  try {
    const result = await axios.put(`${urls.PRODUCT_BASE}${id}`, {
      ...newProduct,
      files: [],
      content: "",
    });
    dispatch(SAVE_PRODUCT(result.data));
  } catch (e) {
    console.log(e);
  }
};
export const cancelProduct = (dispatch) => {
  dispatch(CANCEL_UPDATE_PRODUCT());
};

export const getHistories = async (dispatch, id) => {
  try {
    const result = await axios.get(`${urls.PRODUCT_HISTORY}${id}`);
    dispatch(SET_HISTORIES(result.data));
  } catch (e) {
    console.log(e);
  }
};

export const createHistory = async (dispatch, newHistory, id) => {
  try {
    const result = await axios.post(`${urls.PRODUCT_HISTORY}`, {
      productId: newHistory.id,
      amount: parseInt(newHistory.amount),
      userId: id,
    });
    dispatch(ADD_HISTORIES(result.data));
  } catch (e) {
    console.log(e);
  }
};
