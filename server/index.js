//external imports
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

//internal imports

const userRouter = require("./routers/userRouter");
const areaRouter = require("./routers/areaRouter");
const orderRouter = require("./routers/orderRouter");

const app = express();
dotenv.config();

app.use(cors());
app.use(express.json());

const port = process.env.PORT || 5000;
const DB = process.env.DB_URL;

try {
  mongoose.connect(DB, {}, () => console.log("Database Connected succesfully"));
} catch (e) {
  console.log("err in DB connection ", e);
}

app.use("/api/user", userRouter);
app.use("/api/area", areaRouter);
app.use("/api/order", orderRouter);

app.listen(port, () => console.log("Server listaning on port ", port));
