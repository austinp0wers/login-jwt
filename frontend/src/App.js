import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Router, Switch, Route, Link } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Login from "./components/loginForm/LoginForm";
import Register from "./components/signupForm/SignUpForm";
import Profile from "./components/profile/Profile";
// import BoardUser from "./components/BoardUser";
// import BoardModerator from "./components/BoardModerator";
// import BoardAdmin from "./components/BoardAdmin";

import { logout } from "./store/actions/auth";
import { clearMessage } from "./store/actions/message";

import { history } from "./helpers/history";

import AuthVerify from "./common/AuthVerify";
import EventBus from "./common/EventBus";
import Home from "./components/home/Home";
import Navbar from "./components/navbar/Navbar";

const App = () => {
  return (
    <Router history={history}>
      <div>
        <Navbar />

        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/home"]} component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/profile" component={Profile} />
            {/* <Route path="/user" component={BoardUser} /> */}
            {/* <Route path="/mod" component={BoardModerator} /> */}
            {/* <Route path="/admin" component={BoardAdmin} /> */}
          </Switch>
        </div>
      </div>
    </Router>
  );
};

export default App;
