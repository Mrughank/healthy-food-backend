const express = require("express");
const router = express.Router();

const {
  sendMessage,
  getAllMessages,
  deleteMessage
} = require("../Controller/contactcontroller");

// ✅ USER SEND MESSAGE
router.post("/add", sendMessage);

// ✅ SELLER GET ALL MESSAGES
router.get("/all", getAllMessages);

// ✅ DELETE MESSAGE
router.delete("/delete/:id", deleteMessage);

module.exports = router;
