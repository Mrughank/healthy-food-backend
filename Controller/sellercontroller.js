const Seller = require("../Model/sellermodel.js");
const Food = require("../Model/foodmodel");    // ⭐ ADD THIS
const Order = require("../Model/ordermodel");  // ⭐ REQUIRED FOR getSellerOrders

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const SECRET = "healthyfood_seller_secret_2025";

// ---------------- SELLER REGISTER -------------------
const register = (req, res) => {
  const { username, email, userpassword } = req.body;
  const hashed = bcrypt.hashSync(userpassword, 10);

  Seller.create({ username, email, userpassword: hashed })
    .then((seller) => res.send({ success: true, seller }))
    .catch((err) => res.send({ success: false, msg: err.message }));
};

// ---------------- SELLER LOGIN -----------------------
const login = async (req, res) => {
  const { username, userpassword } = req.body;

  try {
    const seller = await Seller.findOne({ username });
    if (!seller) return res.send({ success: false, msg: "Seller not found" });

    const ok = bcrypt.compareSync(userpassword, seller.userpassword);
    if (!ok) return res.send({ success: false, msg: "Invalid Password" });

    // ⭐ Create JWT Token
    const token = jwt.sign({ id: seller._id }, SECRET, { expiresIn: "7d" });

    res.send({
      success: true,
      seller,
      token,
    });
  } catch (err) {
    res.send({ success: false, msg: err.message });
  }
};

// ---------------- FOOD CRUD -------------------------
const addFood = (req, res) => {
  Food.create(req.body)
    .then((food) => res.send(food))
    .catch((err) =>
      res.status(500).send({ msg: "Failed to add food", error: err.message })
    );
};

const getAllFoods = async (req, res) => {
  try {
    const foods = await Food.find();
    res.send(foods);
  } catch (err) {
    res.status(500).send({ success: false, msg: err.message });
  }
};

const getSellerFoods = (req, res) => {
  const sellerId = req.params.id;
  Food.find({ sellerId })
    .then((foods) => res.send(foods))
    .catch((err) =>
      res.status(500).send({ msg: "Error fetching seller foods", error: err.message })
    );
};

const updateFood = (req, res) => {
  Food.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((food) => res.send(food))
    .catch((err) =>
      res.status(500).send({ msg: "Update Failed", error: err.message })
    );
};

const deleteFood = (req, res) => {
  Food.findByIdAndDelete(req.params.id)
    .then(() => res.send({ success: true }))
    .catch((err) =>
      res.status(500).send({ msg: "Delete Failed", error: err.message })
    );
};

// ---------------- SELLER ORDERS ---------------------
const getSellerOrders = async (req, res) => {
  const { sellerId } = req.params;

  try {
    const orders = await Order.find({
      "items.sellerId": sellerId,
    });

    res.send({ success: true, orders });
  } catch (err) {
    res.status(500).send({ success: false, msg: err.message });
  }
};

module.exports = {
  register,
  login,
  addFood,
  getAllFoods,
  getSellerFoods,
  updateFood,
  deleteFood,
  getSellerOrders,
};
