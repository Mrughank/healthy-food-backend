const express = require("express");
const router = express.Router();

const {
  addToCart,
  getCart,
  updateQty,
  removeItem,
  clearCart
} = require("../Controller/cartcontroller");

const userAuth = require("../Middleware/authMiddleware");

// ADD TO CART
router.post("/add", userAuth, addToCart);

// GET USER CART
router.get("/", userAuth, getCart);

// UPDATE QUANTITY
router.put("/update/:itemId", userAuth, updateQty);

// REMOVE ITEM
router.delete("/remove/:itemId", userAuth, removeItem);

// CLEAR CART
router.delete("/clear", userAuth, clearCart);

module.exports = router;
