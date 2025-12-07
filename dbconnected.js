const mongoose = require("mongoose");

mongoose.connect(process.env.DBUrl)
  .then(() => console.log("✅ DB Connected"))
  .catch(err => console.log("❌ DB Error:", err.message));
