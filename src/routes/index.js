const router = require("express").Router();
const controller = require("../app/auth");
const { findSingleUserImages } = require("../app/gallery/controllers");
const createImage = require("../app/gallery/controllers/createImage");
const deleBulkImages = require("../app/gallery/controllers/deleteBulkImages");
const getAllGalleryImages = require("../app/gallery/controllers/getAllGalleryImages");
const authenticate = require("../middleware/athenticate");

router
  .post("/api/auth/register", controller.register)
  .post("/api/auth/login", controller.login);

router
  .route("/api/galleries")
  .post(authenticate, createImage)
  .get(getAllGalleryImages)
  .delete(authenticate, deleBulkImages);

router.get("/api/users/galleries", authenticate, findSingleUserImages);

module.exports = router;
