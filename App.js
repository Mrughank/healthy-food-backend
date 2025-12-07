const express = require("express");
const cors = require("cors");
require("dotenv").config();
require("./dbconnected");

const app = express();

// ⭐ Middleware
app.use(express.json());
app.use(cors());

const userroutes = require('./Routes/userRoutes');
const sellerroutes = require('./Routes/sellerroutes');
const cartroutes = require('./Routes/cartroutes');
const orderroutes = require('./Routes/orderroutes');
const contactroutes= require("./Routes/contactroutes");

app.use('/user', userroutes);
app.use('/seller', sellerroutes);
app.use('/cart', cartroutes);
app.use('/order', orderroutes);
app.use('/contact',contactroutes)


const PORT = process.env.PORT || 9000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

