const router = require("express").Router();
const Conversation = require("../models/Conversation");

// new conversation
router.post("/", async (req, res) => {
  const newConversation = new Conversation({
    members: [req.body.senderId, req.body.receiverId],
  });
  try {
    const savedConversation = await newConversation.save();
    res.status(200).json(savedConversation);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// get conversation of a user
router.get("/:userId", async (req, res) => {
  try {
    const msg = await Conversation.find({
      members: { $in: [req.params.userId] },
    });
    res.status(200).json(msg);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get conversation include two users
router.get("/find/:userId/:userId2", async (req, res) => {
  try {
    const msg = await Conversation.find({
      members: { $in: [req.params.userId, req.params.userId2] },
    });
    res.status(200).json(msg);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
