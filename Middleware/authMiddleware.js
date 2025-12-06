const jwt = require("jsonwebtoken");
const User = require("../Model/usermodel");

const SECRET = process.env.JWT_SECRET || "MY_SECRET_KEY_12345";

module.exports = async (req, res, next) => {
  try {
    const header = req.headers.authorization;
    if (!header) return res.status(401).send({ success: false, msg: "No token" });

    const token = header.split(" ")[1];
    const decoded = jwt.verify(token, SECRET);

    const user = await User.findById(decoded.id);
    if (!user) return res.status(404).send({ success: false, msg: "User not found" });

    req.user = { id: user._id };
    next();

  } catch (err) {
    return res.status(401).send({ success: false, msg: "Token invalid or expired" });
  }
};
