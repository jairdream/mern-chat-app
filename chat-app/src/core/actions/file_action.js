import { baseURL, urls } from "../../utils/config";
import axios from "../axiosConfig";

export const uploadFile = async (files) => {
  try {
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
    }
    const result = await axios.post(`${urls.file_upload}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return result.data;
  } catch (e) {
    console.log(e);
    return null;
  }
};
