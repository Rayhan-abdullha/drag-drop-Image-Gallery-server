const { createAccount } = require("../../../lib/auth");
const { generateToken } = require("../../../utils/hashing");

const register = async (req, res, next) => {
  const { name, email, password } = req.body;
  try {
    const user = await createAccount({ name, email, password });
    const payload = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    };

    // token generate
    const tokenGen = await generateToken({ payload });

    // response
    const response = {
      code: 201,
      message: "User Register Successfull",
      data: {
        token: tokenGen,
      },
      links: {
        self: `${req.url}`,
        signin: `/api/auth/signin`,
      },
    };
    return res.status(201).json(response);
  } catch (err) {
    next(err);
  }
};
module.exports = register;
