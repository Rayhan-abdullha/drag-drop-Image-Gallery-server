const { findAllImages } = require("../../../lib/gallery");

const getAllGalleryImages = async (req, res, next) => {
  try {
    const galleries = await findAllImages();

    const response = {
      code: 200,
      data: [...galleries],
    };

    return res.status(200).json(response);
  } catch (err) {
    next(err);
  }
};

module.exports = getAllGalleryImages;
