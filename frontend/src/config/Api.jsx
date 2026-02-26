import axios from "axios";

const axiosInstance = axios.create({
  baseURL:"https://navkalpana-ricr-nk-0029.onrender.com",
  withCredentials: true,
});

export default axiosInstance;


