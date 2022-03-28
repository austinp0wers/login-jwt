const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");

const User = require("../models/User");

module.exports = () => {
  passport.use(
    new localStrategy(
      {
        usernameField: "email",
        passwordField: "password",
      },
      async (email, password, done) => {
        try {
          const existingUser = await User.findOne({ email });
          if (existingUser) {
            const checkPassword = await bcrypt.compare(
              password,
              existingUser.password
            );
            if (checkPassword) {
              done(null, existingUser);
            } else {
              done(null, false, { msg: "비밀번호가 일치하지 않습니다." });
            }
          } else {
            done(null, false, { msg: "유저가 존재하지 않습니다." });
          }
        } catch (error) {
          console.error(error);
          done(error);
        }
      }
    )
  );
};
