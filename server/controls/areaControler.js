//internal imports
const Area = require("../models/area");

//get all city
const allCity = async (req, res, next) => {
  let citys;
  try {
    citys = await Area.find({});
  } catch (e) {
    return console.log("Problem in server area all city ", e);
  }
  return res.status(200).json({ citys });
};
//get spacific city
const city = async (req, res, next) => {
  let singlecity;
  try {
    singlecity = await Area.findOne({ name: req.body.name });
  } catch (e) {
    return console.log("Problem in single city: ", e);
  }

  // console.log(singlecity.name);
  try {
    if (singlecity.name) {
      return res.status(200).json({
        message: "This area existed",
        name: singlecity.name,
        status: singlecity.status,
      });
      console.log("area found");
    } else {
      return res.status(200).json({
        message: "Area not found",
        name: "not found",
        status: "nothing",
      });
      console.log("area not found");
    }
  } catch (e) {
    return res.status(200).json({
      message: "Area not found",
      name: "not found",
      status: "nothing",
    });
  }
};

//delete spacific city
const deletecity = async (req, res, next) => {
  try {
    await Area.deleteOne({ name: req.body.name });
  } catch (e) {
    return console.log("Problme in server deletecity: ", e);
  }
  return res.status(200).json({ message: "Area deleted successfully " });
};
//delete random city
const deleterandomcity = async (req, res, next) => {
  const id = req.params.id;
  let deletecity;
  try {
    deletecity = await Area.findByIdAndDelete(id);
  } catch (e) {
    return console.log("Problem in server delete area/city ", e);
  }
  if (!deletecity) {
    return res.status(400).json({ message: "Unable to delete" });
  }
  return res.status(200).json({ message: "Delete Successfully ", check: true });
};
//get inCity areas
const inCity = async (req, res, next) => {
  let inareas;
  try {
    inareas = await Area.find({ status: "in" });
  } catch (e) {
    console.log("Problem in server inCity: ", e);
  }
  res.status(200).json({ inareas });
};

//get outCity areas
const outCity = async (req, res, next) => {
  let outareas;

  try {
    outareas = await Area.find({ status: "out" });
  } catch (e) {
    console.log("Problem in server outCity: ", e);
  }

  res.status(200).json({ outareas });
};

//Include new Areas
const postCity = async (req, res, next) => {
  const name = req.body.name;

  let isexist;
  try {
    isexist = await Area.findOne({ name });
  } catch (e) {
    return console.log("problem in area existing case: ", e);
  }
  if (name === "" || name === " ") {
    return res.status(400).json({ message: "There was Nothig for Insert" });
  } else if (isexist) {
    return res.status(400).json({ message: "This area Already Existed" });
  } else {
    const area = new Area({ name: req.body.name, status: req.body.status });
    try {
      await area.save();
    } catch (e) {
      return console.log("problem in backend of area saveing: ", e);
    }
    return res
      .status(201)
      .json({ message: "Area inserted successfully", area });
  }
};

module.exports = {
  inCity,
  outCity,
  postCity,
  allCity,
  city,
  deletecity,
  deleterandomcity,
};
