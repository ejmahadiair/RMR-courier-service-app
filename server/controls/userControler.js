//external imports
const bcrypt = require("bcrypt");
//internal imports
const User = require("../models/userModel");

//Get access all user
const getUser = async (req, res, next) => {
  let alluser;
  try {
    alluser = await User.find();
  } catch (e) {
    return console.log(e);
  }

  if (!alluser) {
    return res.status(404).json({ message: "User not found" });
  } else {
    return res.status(200).json({ alluser });
  }
};

//get spacific user status
const getuserbyid = async (req, res, next) => {
  let userId = req.body.id;
  let user;
  try {
    user = await User.findById(userId);
  } catch (e) {
    return console.log("Problem in server userbyid ", e);
  }
  if (!user) {
    return res
      .status(404)
      .json({ message: "Did not found any user by this Id" });
  }
  return res.status(200).json({ message: "User exist ", user });
};

//Register New User
const registertUser = async (req, res, next) => {
  const { name, email, password } = req.body;
  let isexist;
  try {
    isexist = await User.findOne({ email });
  } catch (e) {
    return console.log(e);
  }

  if (isexist) {
    return res
      .status(400)
      .json({ exist: "This email Already used try with another email" });
  }

  const hashPassword = bcrypt.hashSync(password, 10);
  const user = new User({
    name,
    email,
    password: hashPassword,
  });

  try {
    await user.save();
  } catch (e) {
    return console.log(e);
  }

  return res.status(201).json({ user });
};

//Get Profile with login

const loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  let isexist;
  try {
    isexist = await User.findOne({ email });
  } catch (e) {
    return console.log(e);
  }

  if (!isexist) {
    return res
      .status(404)
      .json({ message: "Could not found User", auth: "false" });
  }
  const iscorrectpass = bcrypt.compareSync(password, isexist.password);
  if (!iscorrectpass) {
    return res
      .status(400)
      .json({ message: "Password Incorrect", auth: "false" });
  }
  return res
    .status(200)
    .json({ message: "Login Successfull", user: isexist, auth: "true" });
};

//delete user
const deleteuser = async (req, res, next) => {
  const id = req.params.id;
  let user;
  try {
    user = await User.findByIdAndDelete(id);
  } catch (e) {
    return console.log("problem in server delete User ", e);
  }
  if (!user) {
    return res.status(400).json({ message: "Unable to delete User" });
  }
  return res
    .status(200)
    .json({ message: "User Deleted successfully", check: true });
};

module.exports = { getUser, registertUser, loginUser, getuserbyid, deleteuser };
