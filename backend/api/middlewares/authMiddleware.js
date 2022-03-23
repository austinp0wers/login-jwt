const jwt = require("jsonwebtoken");
const User = require("../../models/User");

exports.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(403).send("log in required");
  }
};

exports.isNotLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    next();
  } else {
    const message = encodeURIComponent("already logged in");
    res.redirect(`/?error=${message}`);
  }
};

exports.verifyToken = (req, res, next) => {
  try {
    req.decoded = jwt.verify(req.headers.authorization, process.env.JWT_SECRET);
    return next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      res.status(419).json({
        code: 419,
        message: "token has expired",
      });
    }
    return res.status(401).json({
      code: 401,
      message: "token is not valid",
    });
  }
};

exports.allUser = async (req, res) => {
  const users = await User.find({
    include: {
      model: User,
      attributes: ["id", "nick"],
    },
    order: [["createdAt", "DESC"]],
  });
  res.json({ users });
};
