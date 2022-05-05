//External imports
const express = require("express");

//Internal imports
const {
  getUser,
  registertUser,
  loginUser,
  getuserbyid,
  deleteuser,
  getmarchents,
  edituser,
} = require("../controls/userControler");

const Userrouter = express.Router();

Userrouter.get("/", getUser);
Userrouter.get("/marchent", getmarchents);
//getspacific user details
Userrouter.post("/id", getuserbyid);
//edit user details
Userrouter.put("/:id", edituser);

Userrouter.post("/signup", registertUser);
Userrouter.post("/login", loginUser);
Userrouter.delete("/:id", deleteuser);

module.exports = Userrouter;
