const express = require("express");
const categotyConroller = require("../controllers/categoryController");

const router = express.Router();

router.route("/").post(categotyConroller.createCategory);

module.exports = router;