const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  items: [
    {
      itemId: {
        type: String,
        required: true
      },

      foodId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Food",
        required: true
      },

      sellerId: {                     // ⭐ REQUIRED FOR SELLER ORDERS
        type: mongoose.Schema.Types.ObjectId,
        ref: "Seller",
        required: true
      },

      qty: {
        type: Number,
        default: 1,
        min: 1
      }
    }
  ]
});

module.exports = mongoose.models.Cart || mongoose.model("Cart", cartSchema);
