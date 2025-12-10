const Contact = require("../Model/contactmodel");

// ✅ USER SEND MESSAGE
const sendMessage = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    const newMsg = await Contact.create({
      name,
      email,
      message,
      date: new Date(),
    });

    res.send({ success: true, message: newMsg });
  } catch (err) {
    res.status(500).send({ success: false, msg: err.message });
  }
};

// ✅ SELLER GET ALL MESSAGES
const getAllMessages = async (req, res) => {
  try {
    const messages = await Contact.find().sort({ date: -1 });
    res.send({ success: true, messages });
  } catch (err) {
    res.status(500).send({ success: false, msg: err.message });
  }
};

module.exports = { sendMessage, getAllMessages };
