const dotenv = require("dotenv");

dotenv.config();

const configurations = {
  api: {
    prefix: "/api",
  },
};

module.exports = configurations;
