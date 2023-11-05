const express = require("express");
const router = require("./routes");
const { appLevelMiddleware } = require("./middleware");
const notFoundHandler = require("./error/notFoundHandler");
const globalErrorHandler = require("./error/globalErrorHandler");
const app = express();
// app level middleware
appLevelMiddleware(app);

app.get("/", (req, res, next) => {
  res.status(200).json({
    code: 200,
    message: "Server is running...",
  });
});
// routes
app.use(router);

app.use(notFoundHandler);
app.use(globalErrorHandler);

module.exports = app;
