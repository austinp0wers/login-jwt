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

const login = (email, password) => {
  return axios
    .post(API_URL + "signin", {
      email,
      password,
    })
    .then((response) => {
      if (response.data.accessToken) {
        console.log("set token");
        localStorage.setItem("user", JSON.stringify(response.data.accessToken));
      }

      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
};

export default {
  register,
  login,
  logout,
};
