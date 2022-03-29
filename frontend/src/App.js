import React from "react";
import { Router, Switch, Route } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Login from "./components/loginForm/LoginForm";
import Register from "./components/signupForm/SignUpForm";
import Profile from "./components/profile/Profile";

import { history } from "./helpers/history";
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
          </Switch>
        </div>
      </div>
    </Router>
  );
};

export default App;
