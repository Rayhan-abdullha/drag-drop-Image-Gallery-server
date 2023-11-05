const { deleteImages } = require("../../../lib/gallery");

const deleBulkImages = async (req, res, next) => {
  const { ids } = req.body;

  try {
    await deleteImages({ ids });

    return res.status(200).json({
      code: 200,
      message: "Images delete Successfull",
    });
  } catch (err) {
    next(err);
  }
};

module.exports = deleBulkImages;
