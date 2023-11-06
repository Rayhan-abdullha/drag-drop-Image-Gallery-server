require("dotenv").config();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const generateToken = ({
  payload,
  secret = "my-secret",
  algorithm = "HS256",
}) => {
  const expiration = 30 * 24 * 60 * 60;
  try {
    return jwt.sign(payload, secret, { expiresIn: expiration, algorithm });
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
