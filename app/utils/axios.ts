import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from "axios";
import { getToken } from "./auth";
const baseUrl: string | undefined = process.env.NEXT_PUBLIC_BASE_URL;
// Custom error interface for better typing
interface CustomError extends Error {
  status?: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any;
}
interface ErrorResponse {
  error: string;
  message: string;
}
// Create axios instance with base configuration
const client: AxiosInstance = axios.create({
  baseURL: baseUrl,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});
client.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    // check the config content
    if (config.data instanceof FormData) {
      delete config.headers["Content-Type"];
    } else {
      config.headers["Content-Type"] = "application/json";
    }
    return config;
  },
  (error) => Promise.reject(error)
);
// Response interceptor for standardized data extraction and error handling
client.interceptors.response.use(
  (response) => response.data, // Extract data from successful responses
  (error: AxiosError<ErrorResponse>) => {
    const customError: CustomError = new Error(
      error?.response?.data?.error ||
        error?.response?.data?.message ||
        error.message ||
        `HTTP error! Status: ${error.response?.status || "unknown"}`
    );
    customError.status = error.response?.status;
    customError.data = error.response?.data;
    if (error.response?.status && error.response.status >= 500) {
      console.error(
        "Server error:",
        error.response.status,
        error.response.data
      );
    }
    return Promise.reject(customError);
  }
);
// Typed request function - now much simpler because interceptors handle the work
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const request = async <T = any>(
  options: AxiosRequestConfig
): Promise<T> => {
  return client(options) as Promise<T>;
};