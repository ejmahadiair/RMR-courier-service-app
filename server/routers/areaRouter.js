const express = require("express");
const {
  inCity,
  outCity,
  postCity,
  allCity,
  city,
  deletecity,
  deleterandomcity,
} = require("../controls/areaControler");

const arearoute = express.Router();

//get allcitys
arearoute.get("/", allCity);
//get spacific city
arearoute.post("/city", city);
//get inCity
arearoute.get("/in", inCity);
//get outCity
arearoute.get("/out", outCity);
//include new area
arearoute.post("/", postCity);
//delete spacific city
arearoute.delete("/city", deletecity);
//delete random city
arearoute.delete("/:id", deleterandomcity);

module.exports = arearoute;
