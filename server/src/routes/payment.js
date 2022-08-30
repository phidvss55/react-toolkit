const router = require("express").Router();
const { checkoutPayment } = require("../controllers/paymentController");

router.post("/payment", checkoutPayment);

module.exports = router;
