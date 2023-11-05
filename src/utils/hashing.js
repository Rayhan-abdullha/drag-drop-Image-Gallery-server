const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const generateToken = ({
  payload,
  secret = process.env.ACCESS_TOKEN_SECRET,
  algorithm = "HS256",
}) => {
  try {
    return jwt.sign(payload, secret, { expiresIn: "2h", algorithm });
  } catch (err) {
    throw errors.serverError();
  }
};

const comparePassword = async (raw, hash) => {
  return await bcrypt.compare(raw, hash);
};

module.exports = {
  generateToken,
  comparePassword,
};
