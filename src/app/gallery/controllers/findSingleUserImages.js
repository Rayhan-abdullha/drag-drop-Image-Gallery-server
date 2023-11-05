const { findUserImg } = require("../../../lib/gallery");

const findSingleUserImages = async (req, res, next) => {
  try {
    const galleries = await findUserImg({ user: req.user });

    const response = {
      code: 200,
      data: [...galleries],
    };

    return res.status(200).json(response);
  } catch (err) {
    console.log("errro");
    next(err);
  }
};

module.exports = findSingleUserImages;
