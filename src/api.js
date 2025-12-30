import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:5000/api"
});

export const authHeaders = () => {
  const token = localStorage.getItem("token");
  return { headers: { Authorization: `Bearer ${token}` } };
};
