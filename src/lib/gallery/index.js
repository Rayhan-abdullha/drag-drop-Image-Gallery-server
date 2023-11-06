const Gallery = require("../../model/Gallery");
const User = require("../../model/User");
const { BadRequest, authorizetionError } = require("../../utils/error");

const findAllImages = async () => {
  return await Gallery.find({});
};

const findUserImg = async ({ user = {} }) => {
  return await Gallery.find({ author: user.id });
};

const uploadImage = async ({ img, user = {} }) => {
  if (!img) {
    throw BadRequest();
  }

  const gallery = new Gallery({ img, author: user.id });
  await gallery.save();
  return {
    ...gallery._doc,
    id: gallery.id,
  };
};

const deleteImages = async ({ ids = [], user = {} }) => {
  if (!user) {
    throw authorizetionError();
  }
  if (!ids.length) {
    throw BadRequest();
  }

  return await Gallery.deleteMany({ _id: { $in: ids } });
};

module.exports = {
  uploadImage,
  deleteImages,
  findUserImg,
  findAllImages,
};
