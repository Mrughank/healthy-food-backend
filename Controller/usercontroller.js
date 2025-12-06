const User = require("../Model/usermodel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// SECRET KEY
const SECRET_KEY = process.env.JWT_SECRET || "MY_SECRET_KEY_12345";

/* ============================
          SIGNUP
=============================== */
const signup = (req, res) => {
  const { name, password, email, phone } = req.body;

  // Validate fields
  if (!name || !password || !email || !phone) {
    return res.status(400).send({ success: false, msg: "All fields required" });
  }

  // Hash password
  const hashedPassword = bcrypt.hashSync(password, 10);

  // Save user
  User.create({
    name: name,
    password: hashedPassword,
    email: email,
    phone: phone,
  })
    .then((user) => {
      res.send({
        success: true,
        msg: "User registered successfully",
        user,
      });
    })
    .catch((err) => {
      res.status(500).send({ success: false, msg: err.message });
    });
};

/* ============================
           LOGIN
=============================== */
const login = (req, res) => {
  const { username, userpassword } = req.body;

  if (!username || !userpassword) {
    return res
      .status(400)
      .send({ msg: "Username and password required" });
  }

  // Check if user exists
  User.findOne({ name: username })
    .then((user) => {
      if (!user) {
        return res.status(404).send({ msg: "User not found" });
      }

      // Check password
      const isMatch = bcrypt.compareSync(userpassword, user.password);

      if (!isMatch) {
        return res.status(401).send({ msg: "Incorrect password" });
      }

      // Create token payload
      const payload = {
        id: user._id,
        username: user.name,
        email: user.email,
      };

      // Generate token
      const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "4h" });

      res.status(200).send({
        success: true,
        msg: "Login successful",
        token,
        user: payload,
      });
    })
    .catch((err) => {
      res.status(500).send({ msg: "Server error", error: err.message });
    });
};

module.exports = { signup, login };
