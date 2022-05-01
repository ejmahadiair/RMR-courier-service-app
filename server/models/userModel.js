//external imports
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },

  status: {
    type: String,
    enum: ["admin", "marchent", "dman"],
    default: "marchent",
    required: true,
  },
  order: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Order",
      required: true,
    },
  ],
});

module.exports = mongoose.model("User", UserSchema);
