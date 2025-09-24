import { config } from "@/config";
import axios, { AxiosError, AxiosRequestConfig } from "axios";
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
// Flag to prevent multiple refresh calls at once
let isRefreshing = false;
let pendingQueue: {
  resolve: (value: unknown) => void;
  reject: (value: unknown) => void;
}[] = [];

const processQueue = (error: unknown) => {
  pendingQueue.forEach((promise) => {
    if (error) {
      promise.reject(error);
    } else {
      promise.resolve(null);
    }
  });
  pendingQueue = [];
};

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & {
      _retry?: boolean;
    };

    const message = (error.response?.data as { message?: string })?.message;

    if (
      error.response?.status === 401 &&
      message === "jwt expired" &&
      !originalRequest._retry
    ) {
      if (isRefreshing) {
        // wait until refresh is done, then retry
        return new Promise((resolve, reject) => {
          pendingQueue.push({ resolve, reject });
        });
      }
      originalRequest._retry = true;
      isRefreshing = true;

      try {
        await axiosInstance.post("/auth/refresh-token");
        processQueue(null);
        return axiosInstance(originalRequest);
      } catch (err) {
        processQueue(err);
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);
