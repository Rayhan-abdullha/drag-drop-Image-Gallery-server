const { uploadImage } = require("../../../lib/gallery");

const createImage = async (req, res, next) => {
  const { img } = req.body;
  try {
    const image = await uploadImage({ img, user: req.user });

    const response = {
      code: 201,
      message: "Image is Uploaded Successfull",
      data: {
        id: image.id,
        img: image.img,
        createdAt: image.createdAt,
        updatedAt: image.updatedAt,
      },
      links: {
        self: `${req.url}`,
      },
    };
    return res.status(201).json(response);
  } catch (err) {
    next(err);
  }
};

module.exports = createImage;
