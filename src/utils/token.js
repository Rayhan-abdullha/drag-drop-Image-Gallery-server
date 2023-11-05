require("dotenv").config();
const errors = require("../utils/error");
const jwt = require("jsonwebtoken");

const decodeToken = ({ token, algorithm = "HS256" }) => {
  try {
    return jwt.decode(token, algorithm);
  } catch (err) {
    throw errors.serverError();
  }
};
const verifyToken = ({
  token,
  secret = process.env.ACCESS_TOKEN_SECRET,
  algorithm = "HS256",
}) => {
  try {
    return jwt.verify(token, secret, { algorithms: [algorithm] });
  } catch (err) {
    throw errors.serverError();
  }
};

module.exports = {
  verifyToken,
  decodeToken,
};
