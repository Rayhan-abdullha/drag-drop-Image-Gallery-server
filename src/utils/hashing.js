require("dotenv").config();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const generateToken = ({
  payload,
  secret = "my-secret",
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
