const express = require("express");
const router = express.Router();

const {
  addMessage,
  getAllMessages,
  deleteMessage
} = require("../Controller/contactcontroller");

router.post("/add", addMessage);
router.get("/all", getAllMessages);
router.delete("/delete/:id", deleteMessage);

module.exports = router;
