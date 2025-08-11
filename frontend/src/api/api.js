import axios from "axios";
import { getToken } from "../utils/token_manager";

const API = axios.create({
  baseURL: "https://mern-todo-wvgj.onrender.com/api",
});

API.interceptors.request.use((req) => {
  const token = getToken();
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;
