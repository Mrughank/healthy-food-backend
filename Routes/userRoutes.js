const router = require("express").Router();


const { signup, login } = require("../Controller/usercontroller");


router.post("/signup", signup);
router.post("/login", login);

module.exports = router;
