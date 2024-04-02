import axios from "axios";

const baseUrl = import.meta.env.VITE_API_BASE_URL as string;

const api = axios.create({
  baseURL: baseUrl,
  //withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    "Acces-Control-Allow-Credentials": true,
  },
});

export default api;
