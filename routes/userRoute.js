const express = require("express");
const authConroller = require("../controllers/authConroller");

const router = express.Router();

router.route("/signup").post(authConroller.createUser);
router.route("/login").post(authConroller.loginUser);
router.route("/logout").get(authConroller.logoutUser);

module.exports = router;