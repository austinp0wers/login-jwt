const express = require("express");
const authRoutes = require("./routes/auth");

module.exports = () => {
  const app = express.Router();

  authRoutes(app);
  return app;
};
