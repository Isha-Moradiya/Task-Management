const User = require("../model/user-model");

const Register = async (req, res, next) => {
  try {
    const { username, email, phone, password } = req.body;
    const userExist = await User.findOne({ email: email });
    if (userExist) {
      return res.status(400).json({ message: "email already exist" });
    }
    const userCreated = await User.create({ username, email, phone, password });
    res.status(201).json({
      message: "Registration Successfully.",
      token: await userCreated.generateToken(),
      userId: await userCreated._id.toString(),
    });
  } catch (error) {
    next(error);
  }
};

const Login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const userExist = await User.findOne({ email: email });
    console.log(userExist);

    if (!userExist) {
      return res.status(400).json({ message: "Invalid Email" });
    }
    const user = await userExist.comparePassword(password);
    if (user) {
      res.status(200).json({
        message: "Login Successfully.",
        token: await userExist.generateToken(),
        userId: await userExist._id.toString(),
      });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    next(error);
  }
};

const user = async (req, res, next) => {
  try {
    const userData = req.user;
    console.log(userData);
  } catch (error) {
    next(error);
  }
};

module.exports = { Register, Login,user };
