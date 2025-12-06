const express = require("express");
const router = express.Router();

const { placeOrder } = require("../Controller/ordercontroller");
const { getSellerOrders } = require("../Controller/ordercontroller"); // or sellercontroller if you prefer

const userAuth = require("../Middleware/authMiddleware");     // ensure this middleware sets req.user.id
const sellerAuth = require("../Middleware/sellerAuth");

// USER → PLACE ORDER
router.post("/place", userAuth, placeOrder);

// SELLER → VIEW ORDERS FOR HIS FOOD
router.get("/seller/:sellerId", sellerAuth, getSellerOrders);

module.exports = router;
