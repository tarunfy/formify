import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://formify-app.herokuapp.com",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});
