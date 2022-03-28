const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { createJWT } = require("../utils/auth");

//forgot password related
// const fpassmodel = require("../models/FindPass");
// const nodemailer = require("nodemailer");
// const randomNumb = require("random-number");
const passport = require("passport");

const emailRegexp =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

const asyncErrorWrapper = (func) => {
  return (req, res, next) => {
    func(req, res, next).catch((err) => {
      next(err);
    });
  };
};

exports.signup = asyncErrorWrapper(async (req, res, next) => {
  let { name, email, password, password_confirmation } = req.body;
  let errors = [];
  if (!name) {
    errors.push({ name: "required" });
  }
  if (!email) {
    errors.push({ email: "required" });
  }
  if (!emailRegexp.test(email)) {
    errors.push({ emailReg: "Invalid" });
  }
  if (!password) {
    errors.push({ password: "required" });
  }
  if (!password_confirmation) {
    errors.push({ confirmPassword: "required" });
  }
  if (password != password_confirmation) {
    errors.push({ password: "mismatch" });
  }
  if (errors.length > 0) {
    return res.status(422).json({ errors: errors });
  }
  const user = await User.findOne({ email: email });
  if (user) {
    const message = "user already exists";
    const error = new Error({ message });
    error.status = 422;
    next(error);
  } else {
    const user = new User({
      name: name,
      email: email,
      password: password,
    });
    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(password, salt, async function (err, hash) {
        if (err) throw err;
        user.password = hash;
        try {
          await user.save();
          const message = "signup successful";
          res.status(200).json({
            success: true,
            message,
          });
        } catch (err) {
          console.error(err);
          res.status(500).json({
            errors: [{ error: err.message }],
          });
        }
      });
    });
  }
});

exports.signin = async (req, res, next) => {
  passport.authenticate("local", (authError, user, info) => {
    if (authError) {
      console.error(authError);
      return next(authError);
    }
    if (!user) {
      console.error("error = ", info.message);
      return next(authError);
    }
    return req.login(user, (loginError) => {
      if (loginError) {
        console.error(loginError.message);
        return next(loginError);
      }
      let access_token = createJWT(user.email, user._id, 3600);
      jwt.verify(access_token, process.env.TOKEN_SECRET, (err, decoded) => {
        if (err) {
          res.status(500).json({ error: err.message });
        }
        if (decoded) {
          return res.status(200).json({
            success: true,
            token: access_token,
            message: user,
          });
        }
      });
    });
  })(req, res, next);
};

// exports.findPassword = asyncErrorWrapper(async (req, res) => {
//   const clientMail = req.body.email;
//   User.findOne({ email: clientMail })
//     .then((user) => {
//       if (!user) {
//         res
//           .status(206)
//           .json({ message: "Wrong email or email is not registered" });
//       } else {
//         let options = {
//           min: 12529,
//           max: 91759,
//           integer: true,
//         };
//         const otpGen = randomNumb(options) + "";

//         //need SMTP service account from ethereal.email
//         nodemailer.createTestAccount((err, account) => {
//           if (err) {
//             console.error("failed to create a testing account " + err.message);
//             return process.exit(1);
//           }
//           //create a smtp transporter object
//           let transporter = nodemailer.createTransport({
//             service: "gmail",
//             auth: {
//               user: process.env.EMAIL,
//               pass: process.env.EMAILPASSWORD,
//             },
//           });
//           let message = {
//             from: process.env.EMAIL,
//             to: clientMail,
//             subject: "OTP 인증",
//             text: "Sent successfully",
//             html: otpGen,
//           };
//           transporter.sendMail(message, async (err, info) => {
//             if (err) {
//               console.log("Error occurred. " + err.message);
//               res.status(500).json({
//                 message: "Service not working atm. try again later ",
//               });
//               return process.exit(1);
//             }

//             console.log("otp sent");
//             let myFind = new fpassmodel({
//               otp: otpGen,
//               email: clientMail,
//             });

//             try {
//               const response = await myFind.save();
//               if (response) {
//                 res.status(200).send({});
//                 console.log("OTP saved");
//               }
//             } catch (err) {
//               console.log(err.message);
//             }
//           });
//         });
//       }
//     })
//     .catch((err) => {
//       console.log(err.message);
//     });
// });

exports.changePassword = (req, res) => {
  const clientMail = req.body.email;
  let newPass = req.body.password;

  bcrypt.genSalt(10, function (err, salt) {
    bcrypt.hash(newPass, salt, async function (err, hash) {
      if (err) throw err;
      newPass = hash;
      try {
        const user = await User.findOneAndUpdate(
          { email: clientMail },
          { $set: { password: newPass } }
        );
        if (user) {
          res.status(200).json({
            success: true,
            message: response,
          });
        }
      } catch (err) {
        res.status(400).json({
          success: false,
          message: "error has occurred " + err.message,
        });
      }
    });
  });
};

exports.logout = (req, res) => {
  req.logout();
  res.redirect("/");
};
