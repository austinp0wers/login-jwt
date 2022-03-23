const expressLoader = require("./express");
const mongoLoader = require("./mongoose");

const loader = (app) => {
  expressLoader(app);
  mongoLoader();
};

module.exports = loader;
