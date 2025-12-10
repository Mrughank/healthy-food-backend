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

router.post("/add", userAuth, addToCart);
router.get("/", userAuth, getCart);
router.put("/update/:itemId", userAuth, updateQty);
router.delete("/remove/:itemId", userAuth, removeItem);
router.delete("/clear", userAuth, clearCart);

module.exports = router;
