const router = require("express").Router();
const { register, login } = require("../controllers/authController");

// Register New account
router.post("/register", register);

// Login
router.post("/login", login);

module.exports = router;
