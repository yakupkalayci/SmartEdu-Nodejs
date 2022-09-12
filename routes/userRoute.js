const express = require("express");
const { body} = require('express-validator');
const authConroller = require("../controllers/authConroller");
const authMiddleware = require("../middlewares/authMiddleware");
const User = require("../models/User");

const router = express.Router();

router.route("/signup").post(
    [
        body('name').not().isEmpty().withMessage("Please enter your name!"),

        body('email').isEmail().withMessage("Please enter valid email!")
        .custom((userEmail) => {
            return User.findOne({email:userEmail}).then(user => {
                if(user) {
                    return Promise.reject("Email is already exits!");
                }
            })
        }),

        body('password').not().isEmpty().withMessage("Please enter a password!")
    ],
    authConroller.createUser);
router.route("/login").post(authConroller.loginUser);
router.route("/logout").get(authConroller.logoutUser);
router.route("/dashboard").get(authMiddleware, authConroller.getDashboardPage);

module.exports = router;