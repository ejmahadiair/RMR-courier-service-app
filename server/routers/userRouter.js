//External imports
const express = require("express");

//Internal imports
const {
  getUser,
  registertUser,
  loginUser,
  getuserbyid,
  deleteuser,
} = require("../controls/userControler");

const Userrouter = express.Router();

Userrouter.get("/", getUser);
Userrouter.post("/id", getuserbyid);
Userrouter.post("/signup", registertUser);
Userrouter.post("/login", loginUser);
Userrouter.delete("/:id", deleteuser);

module.exports = Userrouter;
