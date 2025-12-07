const Cart = require('../Model/cartmodel');
const Food = require("../Model/foodmodel");
const { v4: uuidv4 } = require("uuid");

// --------------------- GET CART ---------------------
function getCart(req, res) {
  const userId = req.user.id;

  Cart.findOne({ userId })
    .populate("items.foodId")
    .then(cart => {
      if (!cart) {
        return res.send({ success: true, cart: { items: [] } });
      }
      res.send({ success: true, cart });
    })
    .catch(err => {
      res.status(500).send({ success: false, msg: err.message });
    });
}

// --------------------- ADD TO CART ---------------------
function addToCart(req, res) {
  const userId = req.user.id;
  const { foodId, qty } = req.body;

  Food.findById(foodId)
    .then(food => {
      if (!food) {
        return res.status(404).send({ msg: "Food not found" });
      }

      Cart.findOne({ userId }).then(cart => {
        if (!cart) {
          cart = new Cart({ userId, items: [] });
        }

        cart.items.push({
          itemId: uuidv4(),
          foodId: foodId,
          sellerId: food.sellerId,
          qty: qty
        });

        cart.save()
          .then(() => {
            return Cart.findOne({ userId }).populate("items.foodId");
          })
          .then(updatedCart => {
            res.send({ success: true, cart: updatedCart });
          });

      });
    })
    .catch(err => {
      res.status(500).send({ success: false, msg: err.message });
    });
}

// --------------------- UPDATE QTY ---------------------
function updateQty(req, res) {
  const userId = req.user.id;
  const { itemId, type } = req.body;

  Cart.findOne({ userId })
    .then(cart => {
      if (!cart) {
        return res.status(404).send({ msg: "Cart not found" });
      }

      const item = cart.items.find(i => i.itemId === itemId);

      if (!item) {
        return res.status(404).send({ msg: "Item not found" });
      }

      if (type === "inc") item.qty++;
      if (type === "dec" && item.qty > 1) item.qty--;

      cart.save().then(() => {
        Cart.findOne({ userId })
          .populate("items.foodId")
          .then(updated => {
            res.send({ success: true, cart: updated });
          });
      });
    })
    .catch(err => {
      res.status(500).send({ success: false, msg: err.message });
    });
}

// --------------------- REMOVE ITEM ---------------------
function removeItem(req, res) {
  const userId = req.user.id;
  const itemId = req.params.itemId;

  Cart.findOne({ userId })
    .then(cart => {
      if (!cart) return res.send({ success: true, cart: { items: [] } });

      cart.items = cart.items.filter(i => i.itemId !== itemId);

      cart.save().then(() => {
        Cart.findOne({ userId })
          .populate("items.foodId")
          .then(updated => {
            res.send({ success: true, cart: updated });
          });
      });
    })
    .catch(err => res.status(500).send({ success: false, msg: err.message }));
}

// --------------------- CLEAR CART ---------------------
function clearCart(req, res) {
  const userId = req.user.id;

  Cart.findOneAndUpdate({ userId }, { items: [] })
    .then(() => {
      res.send({ success: true, cart: { items: [] } });
    })
    .catch(err => {
      res.status(500).send({ success: false, msg: err.message });
    });
}

// EXPORT ALL FUNCTIONS
module.exports = {
  getCart,
  addToCart,
  updateQty,
  removeItem,
  clearCart
};
