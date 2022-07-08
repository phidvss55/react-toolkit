const router = require("express").Router();
const Conversation = require("../models/Conversation");

// new conversation
router.post("/", async (req, res) => {
  const newConversation = new Conversation({
    member: [req.body.senderId, req.body.receiverId],
  });
  try {
    const savedConversation = await newConversation.save();
    res.status(200).json(savedConversation);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
