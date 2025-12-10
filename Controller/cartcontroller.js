const Cart = require("../Model/cartmodel");
const Food = require("../Model/foodmodel");
const { v4: uuidv4 } = require("uuid");

// --------------------- GET CART ---------------------
const getCart = (req, res) => {
  const userId = req.user.id;

  Cart.findOne({ userId })
    .populate("items.foodId")
    .then(cart => {
      if (!cart) return res.send({ success: true, cart: { items: [] } });
      res.send({ success: true, cart });
    })
    .catch(err => res.status(500).send({ success: false, msg: err.message }));
};

// --------------------- ADD TO CART ---------------------
const addToCart = (req, res) => {
  const userId = req.user.id;
  const { foodId } = req.body;

  Food.findById(foodId)
    .then(food => {
      if (!food) return res.status(404).send({ msg: "Food not found" });

      Cart.findOne({ userId }).then(cart => {
        if (!cart) cart = new Cart({ userId, items: [] });

        const existingItem = cart.items.find(i => i.foodId.equals(foodId));

        if (existingItem) {
          existingItem.qty += 1;
        } else {
          cart.items.push({
            itemId: uuidv4(),
            foodId,
            sellerId: food.sellerId,
            qty: 1
          });
        }

        cart.save().then(() => {
          Cart.findOne({ userId })
            .populate("items.foodId")
            .then(updated => res.send({ success: true, cart: updated }));
        });
      });
    })
    .catch(err => res.status(500).send({ success: false, msg: err.message }));
};

// --------------------- UPDATE QTY ---------------------
const updateQty = (req, res) => {
  const userId = req.user.id;
  const { type } = req.body;
  const { itemId } = req.params;

  Cart.findOne({ userId })
    .then(cart => {
      if (!cart) return res.status(404).send({ msg: "Cart not found" });

      const item = cart.items.find(i => i.itemId === itemId);
      if (!item) return res.status(404).send({ msg: "Item not found" });

      if (type === "inc") item.qty++;
      if (type === "dec" && item.qty > 1) item.qty--;

      cart.save().then(() => {
        Cart.findOne({ userId })
          .populate("items.foodId")
          .then(updated => res.send({ success: true, cart: updated }));
      });
    })
    .catch(err => res.status(500).send({ success: false, msg: err.message }));
};

// --------------------- REMOVE ITEM ---------------------
const removeItem = (req, res) => {
  const userId = req.user.id;
  const itemId = req.params.itemId;

  Cart.findOne({ userId }).then(cart => {
    if (!cart) return res.send({ success: true, cart: { items: [] } });

    cart.items = cart.items.filter(i => i.itemId !== itemId);

    cart.save().then(() => {
      Cart.findOne({ userId })
        .populate("items.foodId")
        .then(updated => res.send({ success: true, cart: updated }));
    });
  });
};

// --------------------- CLEAR CART ---------------------
const clearCart = (req, res) => {
  const userId = req.user.id;

  Cart.findOneAndUpdate({ userId }, { items: [] }).then(() => {
    res.send({ success: true, cart: { items: [] } });
  });
};

module.exports = {
  getCart,
  addToCart,
  updateQty,
  removeItem,
  clearCart
};
