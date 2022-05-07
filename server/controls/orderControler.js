//external imports
const mongoose = require("mongoose");
//internal imports

const Order = require("../models/order");
const User = require("../models/userModel");

//get all order
const allorder = async (req, res, next) => {
  let orders;
  try {
    orders = await Order.find({});
  } catch (e) {
    return console.log("problem in server all orders ", e);
  }
  return res.status(200).json({ orders });
};

//get spacific dalivery orders
const oneorder = async (req, res, nex) => {
  let singleorder;
  try {
    singleorder = await Order.findById(req.body.id);
  } catch (e) {
    return console.log("problem in server singleOrder ", e);
  }

  try {
    if (singleorder) {
      return res
        .status(200)
        .json({ message: "Here is your product information,", singleorder });
    } else {
      return res.status(404).json({ message: "404 not found " });
    }
  } catch (e) {
    return console.log("Problem in get oneorder ", e);
  }
};

//get spacific marchent/compnay all dalivery order
const getallbyid = async (req, res, next) => {
  const userId = req.params.id;
  let userOrders;

  try {
    userOrders = await User.findById(userId).populate("order");
  } catch (e) {
    return console.log("Problem in server spacific order of user ", e);
  }

  if (!userOrders) {
    return res.status(404).json({ message: "No Order found" });
  }
  return res.status(200).json({ userOrders });
};

//place dalivery order

const placeOrder = async (req, res, next) => {
  const { type, city, area, darea, charge, date, status, user } = req.body;
  let newOrder;
  let existuser;
  try {
    existuser = await User.findById(user);
  } catch (e) {
    return console.log("Problem in server existuser ", e);
  }

  try {
    newOrder = await new Order({
      type,
      city,
      area,
      darea,
      charge,
      date,
      status,
      user,
    });
  } catch (e) {
    return console.log("problem in server placeOrder ", e);
  }

  try {
    const session = await mongoose.startSession();
    session.startTransaction();
    if (existuser) {
      await newOrder.save({ session });
      existuser.order.push(newOrder);
      await existuser.save({ session });
    } else {
      await newOrder.save({ session });
    }
    await session.commitTransaction();
  } catch (e) {
    return console.log("Problem in server ordersave ", e);
  }
  return res.status(200).json({
    message: `Dalivery paced successfully. You can change or delete your order within 3 hours. Please remember your order id ${newOrder._id}`,
    newOrder,
  });
};

//edit order details
const updateOrder = async (req, res, next) => {
  let order;
  const orderId = req.params.id;
  const { type, city, area, darea } = req.body;
  try {
    order = await Order.findByIdAndUpdate(orderId, {
      type,
      city,
      area,
      darea,
    });
  } catch (e) {
    return console.log("Problem in server updateOrder ", e);
  }

  if (!order) {
    return res
      .status(500)
      .json({ message: "Unable to update dalivery details " });
  }
  return res
    .status(200)
    .json({ message: "Order Details Updated Successfully ", order });
};

//edit status by aprove
const aproveorderbyadmin = async (req, res, next) => {
  let order;
  const id = req.params.id;
  try {
    order = await Order.findByIdAndUpdate(id, {
      status: req.body.status,
    });
  } catch (e) {
    return console.log("problem in server aporve order by admin: ", e);
  }
  if (!order) {
    return res.status(400).json({ message: "Unable to proced" });
  }
  return res.status(200).json({ message: "Order on process ", order });
};
//Update track
const updateTrack = async (req, res, next) => {
  let track;
  const id = req.params.id;

  try {
    track = await Order.findByIdAndUpdate(id, {
      track: req.body.track,
    });
  } catch (e) {
    return console.log("Problem in server update Track address ", e);
  }
  if (!track) {
    return res.status(500).json({ message: "Unable to Update" });
  }
  return res
    .status(200)
    .json({ message: "Track Updated successfully ", track });
};

//delete order
const deleteOrder = async (req, res, next) => {
  const orderId = req.params.id;
  let orders;
  let userorders;
  try {
    userorders = await Order.findById(orderId);
  } catch (e) {
    return console.log("Problme in server get delete order user ", e);
  }

  try {
    if (userorders.user != null) {
      orders = await Order.findByIdAndDelete(orderId).populate("user");

      await orders.user.order.pull(orders);
      await orders.user.save();
    } else {
      orders = await Order.findByIdAndDelete(orderId);
    }
  } catch (e) {
    return console.log("Problme in server Delete Order ", e);
  }

  if (!orders) {
    return res.status(500).json({ message: "Unable to delete" });
  }
  return res
    .status(200)
    .json({ message: "Dalivery Order deleted successfully", check: true });
};
module.exports = {
  allorder,
  oneorder,
  getallbyid,
  placeOrder,
  updateOrder,
  deleteOrder,
  aproveorderbyadmin,
  updateTrack,
};
