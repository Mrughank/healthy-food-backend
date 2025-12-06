const Contact = require("../Model/contactmodel");

// SAVE MESSAGE
const sendMessage = (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).send({ success: false, msg: "All fields required" });
  }

  Contact.create({ name, email, message })
    .then(() => {
      res.send({ success: true, msg: "Message sent successfully!" });
    })
    .catch((err) => {
      res.status(500).send({ success: false, msg: err.message });
    });
};

// GET ALL MESSAGES
const getMessages = (req, res) => {
  Contact.find()
    .sort({ date: -1 })
    .then((messages) => {
      res.send({ success: true, messages });
    })
    .catch((err) => {
      res.status(500).send({ success: false, msg: err.message });
    });
};

module.exports = { sendMessage, getMessages };
