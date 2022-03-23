const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FindPass = new Schema({
  otp: {
    type: String,
  },
  email: {
    type: String,
  },
  expire_date: {
    type: Date,
    default: Date.now,
    expires: 360,
  },
});

module.exports =
  mongoose.model.FindPass || mongoose.model("FindPass", FindPass);
