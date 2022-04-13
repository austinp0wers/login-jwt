const express = require("express");
const routes = require("../api/index");
const config = require("../config/index");
const session = require("express-session");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const dotenv = require("dotenv");

const passport = require("passport");
const passportConfig = require("../passport");

module.exports = (app) => {
  dotenv.config();

  app.set("port", process.env.PORT || 8083);
  passportConfig();

  app.use(cors());
  app.use(morgan("dev"));
  app.use(cookieParser(process.env.COOKIE_SECRET));
  app.use(express.json());
  app.use(
    express.urlencoded({
      extended: true,
    })
  );

  app.use(
    session({
      resave: false,
      saveUninitialized: false,
      secret: process.env.COOKIE_SECRET,
      cookie: {
        httpOnly: true,
        secure: false,
      },
    })
  );
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(config.api.prefix, routes());

  app.get("/", (req, res) => {
    res.send("welcome.");
  });

  app.use((req, res, next) => {
    const message = "wrong path";
    const error = new Error({ message });
    error.status = 400;
    next(error);
  });

  app.use((err, req, res, next) => {
    console.error("🚀 ~ file: express.js ~ line 56 ~ app.use ~ err", err);
    const { status, type, message } = err;
    return res.status(status).send({ type, message });
  });
};
