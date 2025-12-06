const Order = require("../Model/ordermodel");
const Cart = require("../Model/cartmodel");
const User = require("../Model/usermodel");

const placeOrder = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId);
    if (!user)
      return res.status(404).send({ success: false, msg: "User not found" });

    let cart = await Cart.findOne({ userId }).populate("items.foodId");

    if (!cart || cart.items.length === 0) {
      return res.status(400).send({ success: false, msg: "Cart is empty" });
    }

    // ⭐ FIX: Keep sellerId for each item
    const items = cart.items.map((item) => ({
      foodId: item.foodId._id,
      sellerId: item.sellerId,     // ⭐ REQUIRED
      qty: item.qty
    }));

    const total = cart.items.reduce((sum, item) => {
      return sum + item.qty * (item.foodId?.foodsprice || 0);
    }, 0);

    const order = await Order.create({
      userId,
      username: user.name,
      items,
      total,
      status: "Pending",
      date: new Date()
    });

    // clear cart
    cart.items = [];
    await cart.save();

    res.send({ success: true, order });

  } catch (err) {
    res.status(500).send({ success: false, msg: err.message });
  }
};


// SELLER → VIEW ORDERS FOR HIS FOOD ITEMS
const getSellerOrders = async (req, res) => {
  try {
    const { sellerId } = req.params;

    const orders = await Order.find({ "items.sellerId": sellerId })
      .populate("items.foodId");   // ⭐ IMPORTANT

    res.send({ success: true, orders });
  } catch (err) {
    res.status(500).send({ success: false, msg: err.message });
  }
};


module.exports = { placeOrder, getSellerOrders };
