const express = require("express");
const router = express.Router();
const {
  signup,
  signin,
  // findPassword,
  changePassword,
  logout,
} = require("../../services/auth");

const {
  isNotLoggedIn,
  isLoggedIn,
  allUser,
} = require("../middlewares/authMiddleware");
// Load user Model

// /api/auth/ + routes
const authRoutes = (app) => {
  app.use("/auth", router);

  router.post("/signup", isNotLoggedIn, signup);
  router.post("/signin", isNotLoggedIn, signin);
  // router.post("/findpassword", isNotLoggedIn, findPassword);
  router.put("/changepassword", isLoggedIn, changePassword);
  router.get("/all", isNotLoggedIn, allUser);
  router.post("/logout", isLoggedIn, logout);
};
module.exports = authRoutes;
