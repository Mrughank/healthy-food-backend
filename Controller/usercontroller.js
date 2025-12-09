const User = require("../Model/usermodel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const SECRET_KEY = process.env.JWT_SECRET || "MY_SECRET_KEY_12345";

/* ============================
          SIGNUP ✅
=============================== */
const signup = async (req, res) => {
  try {
    const { name, password, email, phone } = req.body;

    if (!name || !password || !email || !phone) {
      return res.status(400).json({
        success: false,
        msg: "All fields are required",
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        msg: "User already registered",
      });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    const user = await User.create({
      name,
      password: hashedPassword,
      email,
      phone,
    });

    res.status(201).json({
      success: true,
      msg: "User registered successfully",
      user,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      msg: err.message,
    });
  }
};

/* ============================
           LOGIN ✅
=============================== */
const login = async (req, res) => {
  try {
    const { username, userpassword } = req.body;

    if (!username || !userpassword) {
      return res.status(400).json({
        success: false,
        msg: "Username and password required",
      });
    }

    const user = await User.findOne({ name: username });

    if (!user) {
      return res.status(404).json({
        success: false,
        msg: "User not found",
      });
    }

    const isMatch = bcrypt.compareSync(userpassword, user.password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        msg: "Incorrect password",
      });
    }

    const payload = {
      id: user._id,
      username: user.name,
      email: user.email,
    };

    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "4h" });

    res.status(200).json({
      success: true,
      msg: "Login successful",
      token,
      user: payload,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      msg: "Server error",
      error: err.message,
    });
  }
};

module.exports = { signup, login };
