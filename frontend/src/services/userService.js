import axios from "axios";
const API_URL = "http://localhost:5002/api/auth/";

const getPublicContent = () => {
  return axios.get(API_URL + "all");
};

export default {
  getPublicContent,
};
