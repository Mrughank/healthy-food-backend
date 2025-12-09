const express = require("express");
const cors = require("cors");
require("dotenv").config();
require("./dbconnected");

const app = express();

// ✅ Middleware (ORDER MATTERS)
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));
app.use(express.json());

// ✅ Routes
app.use("/user", require("./Routes/userRoutes"));
app.use("/seller", require("./Routes/sellerroutes"));
app.use("/cart", require("./Routes/cartroutes"));
app.use("/order", require("./Routes/orderroutes"));
app.use("/contact", require("./Routes/contactroutes"));

// ✅ Test Route (VERY IMPORTANT FOR DEBUG)
app.get("/", (req, res) => {
  res.send("✅ Backend is running successfully");
});

// ✅ Port (Render / Railway Safe)
const PORT = process.env.PORT || 9000;

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
