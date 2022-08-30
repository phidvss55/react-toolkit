const router = require("express").Router();
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("../mixins/verifyToken");

const {
  createOrder,
  updateOrder,
  deleteOrder,
  getMonthlyIncome,
  listOrders,
  getUserOrder,
} = require("../controllers/orderController");

//CREATE
router.post("/", verifyToken, createOrder);

//UPDATE
router.put("/:id", verifyTokenAndAdmin, updateOrder);

//DELETE
router.delete("/:id", verifyTokenAndAdmin, deleteOrder);

//GET USER ORDERS
router.get("/find/:userId", verifyTokenAndAuthorization, getUserOrder);

// //GET ALL
router.get("/", verifyTokenAndAdmin, listOrders);

// GET MONTHLY INCOME
router.get("/income", verifyTokenAndAdmin, getMonthlyIncome);

module.exports = router;
