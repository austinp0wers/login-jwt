import axios from "axios";
import authHeader from "./authHeader";
const API_URL = "http://localhost:5000/api/auth/";

const getPublicContent = () => {
  return axios.get(API_URL + "all");
};
const getUserBoard = () => {
  return axios.get(API_URL + "user", { headers: authHeader() });
};

export default {
  getPublicContent,
  getUserBoard,
};
