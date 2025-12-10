const express = require("express");
const router = express.Router();
const { getAllMessages, sendMessage } = require("../Controller/contactcontroller");

// USER SEND MESSAGE
router.post("/send", sendMessage);

// SELLER GET ALL MESSAGES ✅ THIS FIXES 404
router.get("/all", getAllMessages);

module.exports = router;
