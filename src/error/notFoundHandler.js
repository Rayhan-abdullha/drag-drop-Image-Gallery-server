const error = require("../utils/error");

const notFoundHandler = (_req, _res, next) => {
  const notFound = error.notFound();
  next(notFound);
};

module.exports = notFoundHandler;
