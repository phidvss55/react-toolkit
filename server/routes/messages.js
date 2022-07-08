const router = require("express").Router();
const Message = require("../models/Message");

// make router insert message
router.post("/", async (req, res) => {
  const newMessage = new Message(req.body); 
  try {
    const savedMessage = await newMessage.save();
    res.status(200).json(savedMessage);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
