const User = require("../model/User");
const { authenticationError } = require("../utils/error");
const { verifyToken } = require("../utils/token");
const authenticate = async (req, _res, next) => {
  if (req.headers.authorization === undefined) {
    return next(authenticationError());
  }

  const token = req.headers.authorization.split(" ")[1];

  try {
    if (!token) {
      next(authenticationError());
    }

    const decoded = verifyToken({ token });

    const user = await User.findOne({ email: decoded.email });
    if (!user) {
      next(authenticationError());
    }

    req.user = { ...user._doc, id: user.id };
    return next();
  } catch (err) {
    next(authenticationError());
  }
};

module.exports = authenticate;
