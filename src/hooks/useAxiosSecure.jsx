import axios from "axios";

const axiosSecure = axios.create({
  baseURL: "https://hope-pulse-server.vercel.app",
});

axiosSecure.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access-token");
    if (token) {
      config.headers.authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosSecure.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);

export default function useAxiosSecure() {
  return axiosSecure;
}
