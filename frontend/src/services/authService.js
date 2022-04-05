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
    console.log(
      "🚀 ~ file: authService.js ~ line 21 ~ login ~ response",
      response
    );
    if (response.data.accessToken) {
      localStorage.setItem(
        "accessToken",
        JSON.stringify(response.data.accessToken)
      );
    }
    console.log(
      "🚀 ~ file: authService.js ~ line 28 ~ login ~ response.data",
      response.data
    );
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
