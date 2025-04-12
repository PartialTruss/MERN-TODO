import axios from "axios";
import { getToken } from "../utils/token_manager";

// Use the environment variable or fall back to localhost in development
const API = axios.create({
  baseURL: import.meta.env.REACT_APP_API_URL,
});

API.interceptors.request.use((req) => {
  const token = getToken();
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;
