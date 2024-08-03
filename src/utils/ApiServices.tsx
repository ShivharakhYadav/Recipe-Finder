import { message } from "antd";
import axios from "axios";

const AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:4000/",
  headers: {
    "Content-Type": "application/json",
  },
});

AxiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!error?.response?.data?.status) {
      message.error(error?.response?.data?.message);
    }
    return Promise.reject(error);
  }
);
export default AxiosInstance;
