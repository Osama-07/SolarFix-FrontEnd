import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://solarfix.runasp.net/api",
});

axiosInstance.interceptors.request.use((config) => {
  const token = sessionStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;
