const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  username: String,

  items: [
    {
      itemId: String,
      foodId: { type: mongoose.Schema.Types.ObjectId, ref: "Food" },
      qty: Number,
      sellerId: { type: mongoose.Schema.Types.ObjectId, ref: "Seller" } // ⭐ ADD THIS
    }
  ],

  total: Number,
  status: { type: String, default: "Pending" },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Order", orderSchema);
