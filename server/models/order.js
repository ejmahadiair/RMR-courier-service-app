//external imports
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const orderSchema = new Schema({
  type: {
    type: String,
  },
  city: {
    type: String,
  },
  area: {
    type: String,
  },
  darea: {
    type: String,
  },
  charge: {
    type: Number,
  },
  track: {
    type: String,
    default: "It's on process",
  },
  date: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ["panding", "process", "ongoing", "complet"],
    default: "panding",
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("Order", orderSchema);
