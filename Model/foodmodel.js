const mongoose = require("mongoose");

const foodSchema = new mongoose.Schema({
  foodsname: {
    type: String,
    required: true,
  },
  foodsprice: {
    type: Number,
    required: true,
  },
  foodsimage: {
    type: String,
    required: true,
  },
  sellerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Seller",
    required: true
  }
});

module.exports = mongoose.models.Food || mongoose.model("Food", foodSchema);
