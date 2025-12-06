const mongoose = require("mongoose");

const SellerSchema = new mongoose.Schema({
  username: String,
  email: String,
  userpassword: String,
});

module.exports = mongoose.model("sellers", SellerSchema);
