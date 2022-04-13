import axios from "axios";

const API_URL = "http://localhost:5002/api/auth/";

const register = (username, email, password, confirmPassword) => {
  return axios.post(API_URL + "signup", {
    username,
    email,
    password,
    confirmPassword,
  });
};

const login = async (email, password) => {
  const response = await axios.post(API_URL + "signin", {
    email,
    password,
  });
  if (response) {
    if (response.data.accessToken) {
      localStorage.setItem(
        "accessToken",
        JSON.stringify(response.data.accessToken)
      );
    }
    return response.data;
  }
};

const logout = () => {
  localStorage.removeItem("accessToken");
};

export default {
  register,
  login,
  logout,
};
