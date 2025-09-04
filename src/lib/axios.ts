import { config } from "@/config";
import axios from "axios";
export const axiosInstance = axios.create({
  baseURL: config.baseUrl,
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config) => config,
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (resolve) => resolve,
  (error) => {
    return Promise.reject(error);
  }
);
