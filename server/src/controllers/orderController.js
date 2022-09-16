const Order = require("../model/Order");
const { responseJson } = require("../mixins/helper");

//CREATE
const createOrder = async (req, res) => {
  const newOrder = new Order(req.body);
  try {
    const savedOrder = await newOrder.save();
    res.status(200).json(responseJson(200, "Ok", savedOrder));
  } catch (err) {
    res.status(500).json(responseJson(500, "Error", err));
  }
};

//UPDATE
const updateOrder = async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(responseJson(200, "Ok", updatedOrder));
  } catch (err) {
    res.status(500).json(responseJson(500, "Error", err));
  }
};

//DELETE
const deleteOrder = async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.status(200).json(responseJson(200, "Order has been deleted...", null));
  } catch (err) {
    res.status(500).json(responseJson(500, "Error", err));
  }
};

// GET USER ORDERS
const getUserOrder = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.userId })
      .populate([{ path: "users", select: "name img" }])
      .exec();
    res.status(200).json(responseJson(200, "Get listing successful", orders));
  } catch (err) {
    res.status(500).json(responseJson(500, "Error", err));
  }
};

// GET ALL
const listOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate([{ path: "userId", select: "name img" }])
      .exec();
    res.status(200).json(responseJson(200, "Ok", orders));
  } catch (err) {
    res.status(500).json(responseJson(500, "Error", err));
  }
};

// GET MONTHLY INCOME
const getMonthlyIncome = async (req, res) => {
  const date = new Date();
  const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
  const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));

  try {
    const income = await Order.aggregate([
      { $match: { createdAt: { $gte: previousMonth } } },
      {
        $project: {
          month: { $month: "$createdAt" },
          sales: "$amount",
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: "$sales" },
        },
      },
    ]);
    res.status(200).json(responseJson(200, "Ok", income));
  } catch (err) {
    res.status(500).json(responseJson(500, "Error", err));
  }
};

module.exports = {
  createOrder,
  updateOrder,
  deleteOrder,
  getMonthlyIncome,
  listOrders,
  getUserOrder,
};
