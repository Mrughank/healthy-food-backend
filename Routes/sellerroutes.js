const express = require("express");
const router = express.Router();

const {
  register,
  login,
  addFood,
  getAllFoods,
  getSellerFoods,
  updateFood,
  deleteFood,
  getSellerOrders,
} = require("../Controller/sellercontroller");

router.post("/register", register);
router.post("/login", login);

router.post("/food/add", addFood);
router.get("/food/all", getAllFoods);
router.get("/food/list/:id", getSellerFoods);
router.put("/food/update/:id", updateFood);
router.delete("/food/delete/:id", deleteFood);

// ⭐ Important
router.get("/orders/:sellerId", getSellerOrders);

module.exports = router;
