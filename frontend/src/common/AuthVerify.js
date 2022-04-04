import React from "react";
import { history } from "../helpers/history";

const parseJwt = (accessToken) => {
  try {
    return JSON.parse(atob(accessToken.split(".")[1]));
  } catch (e) {
    return null;
  }
};

const AuthVerify = (props) => {
  history.listen(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user) {
      const decodedJwt = parseJwt(user);
      console.log(
        "🚀 ~ file: AuthVerify.js ~ line 18 ~ history.listen ~ decodedJwt",
        decodedJwt
      );
      if (decodedJwt.exp * 1000 < Date.now()) {
        props.logOut();
      }
    }
  });

  return <div></div>;
};

export default AuthVerify;
