const router = require("express").Router();
const {
  verifyToken,
  verifyTokenAndAdmin,
  verifyTokenAndAuthorization,
} = require("../mixins/verifyToken");

const {
  createCart,
  updateCart,
  deleteCart,
  cartOfUser,
} = require("../controllers/cartController");

// create
router.post("/", verifyToken, createCart);

// update
router.put("/:id", verifyTokenAndAuthorization, updateCart);

// delete
router.delete("/:id", verifyTokenAndAuthorization, deleteCart);

// get user cart
router.get("/find/:userId", verifyTokenAndAuthorization, cartOfUser);

module.exports = router;
