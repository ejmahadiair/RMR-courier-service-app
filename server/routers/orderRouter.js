//external imports
const express = require("express");
const {
  allorder,
  oneorder,
  getallbyid,
  placeOrder,
  updateOrder,
  deleteOrder,
  aproveorderbyadmin,
  updateTrack,
} = require("../controls/orderControler");

//internal imports

const orderRouter = express.Router();
//get all dalivery orders
orderRouter.get("/", allorder);
//get spasicfic dalivery orders
orderRouter.post("/id", oneorder);
//get spacific marchent/compnay all dalivery order
orderRouter.get("/:id", getallbyid);
//place dalivery order
orderRouter.post("/", placeOrder);
//edit dalivery order
orderRouter.put("/:id", updateOrder);
//edit status by aprove order by admin
orderRouter.put("/aprove/:id", aproveorderbyadmin);
//edit track address
orderRouter.put("/track/:id", updateTrack);
//delete dalivery order
orderRouter.delete("/:id", deleteOrder);

module.exports = orderRouter;
