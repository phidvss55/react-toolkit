const router = require("express").Router();
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("../mixins/verifyToken");

const {
  createProduct,
  updateProduct,
  deleteProduct,
  getProduct,
  listProducts,
} = require("../controllers/productController");

// create
router.post("/", verifyTokenAndAdmin, createProduct);

// update
router.put("/:id", verifyTokenAndAdmin, updateProduct);

// delete
router.delete("/:id", verifyTokenAndAdmin, deleteProduct);

// get product
router.get("/:id", getProduct);

// listing products
router.get("/", listProducts);

module.exports = router;
