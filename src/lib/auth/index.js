const User = require("../../model/User");
const { BadRequest } = require("../../utils/error");
const bcrypt = require("bcryptjs");
const { generateToken, comparePassword } = require("../../utils/hashing");

const createAccount = async ({ name, email, password }) => {
  if (!name || !email || !password) {
    throw BadRequest();
  }

  const existUser = await User.find({ email });
  if (existUser.length) {
    throw BadRequest("User Already Exist");
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  const user = new User({ name, email, password: hash });
  await user.save();
  return {
    ...user._doc,
    id: user.id,
  };
};

const signIn = async ({ email, password }) => {
  if (!email || !password) {
    throw BadRequest();
  }
  const hasUser = await User.findOne({ email });
  if (!hasUser) {
    throw BadRequest();
  }

  const isMatch = await comparePassword(password, hasUser.password);

  if (!isMatch) {
    throw BadRequest();
  }
  const payload = {
    id: hasUser.id,
    name: hasUser.name,
    email: hasUser.email,
    role: hasUser.role,
  };

  // token generate
  const token = await generateToken({ payload });
  return token;
};

module.exports = {
  createAccount,
  signIn,
};
