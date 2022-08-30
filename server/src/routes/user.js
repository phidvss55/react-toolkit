const router = require("express").Router();
const {
  all,
  get,
  update,
  remove,
  getStats,
} = require("../controllers/userController");
const {
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("../mixins/verifyToken");

// Get all users
router.get("/", verifyTokenAndAdmin, all);

// Get user
router.get("/:id", verifyTokenAndAdmin, get);

// Update User
router.put("/:id", verifyTokenAndAuthorization, update);

// Delete user
router.delete("/:id", verifyTokenAndAuthorization, remove);

// Get stats
router.get("/stats", verifyTokenAndAdmin, getStats);

module.exports = router;
