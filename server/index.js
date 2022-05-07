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

const port = 5000;
const DB =
  "mongodb+srv://admin:admin@cluster0.07caq.mongodb.net/RRMExpress?retryWrites=true&w=majority";

try {
  mongoose.connect(DB, {}, () => console.log("Database Connected succesfully"));
} catch (e) {
  console.log("err in DB connection ", e);
}

app.use("/api/user", userRouter);
app.use("/api/area", areaRouter);
app.use("/api/order", orderRouter);

app.use(express.static("./"));
app.listen(port, () => console.log("Server listaning on port ", port));
