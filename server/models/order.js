//external imports
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const orderSchema = new Schema({
  type: {
    type: String,
    required: true,
  },
  city: {
    type: String,
  },
  area: {
    type: String,
    required: true,
  },
  darea: {
    type: String,
    required: true,
  },
  charge: {
    type: Number,
    required: true,
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
  user: [
    {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  ],
});

module.exports = mongoose.model("Order", orderSchema);
