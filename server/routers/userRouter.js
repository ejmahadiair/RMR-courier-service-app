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
  getdman,
} = require("../controls/userControler");

const Userrouter = express.Router();

Userrouter.get("/", getUser);
Userrouter.get("/marchent", getmarchents);
//get dalivery man
Userrouter.get("/dman", getdman);
//getspacific user details
Userrouter.post("/id", getuserbyid);
//edit user details
Userrouter.put("/:id", edituser);

Userrouter.post("/signup", registertUser);
Userrouter.post("/login", loginUser);
Userrouter.delete("/:id", deleteuser);

module.exports = Userrouter;
