//external imports
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const areaSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["in", "out"],
    default: "in",
    required: true,
  },
});

module.exports = mongoose.model("Area", areaSchema);
