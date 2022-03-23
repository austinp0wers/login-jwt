const express = require("express");
const app = express();
const loaders = require("./loaders/index");

loaders(app);

app.listen(app.get("port"), () => {
  console.log(`Server running on port ${app.get("port")}`);
});
