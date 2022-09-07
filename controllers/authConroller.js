const bcrypt = require("bcrypt");
const User = require("../models/User");

exports.createUser = async (req, res) => {
    try {
        const user = await User.create(req.body);

        res.status(201).redirect("/login");
    } catch(error) {
        res.status(400).json({
            status: "fail",
            error
        });
    }
}

exports.loginUser = async (req, res) => {
    try {
        const {email, password} = req.body;

        const user = await User.findOne({email:email});

        if(user) {
            bcrypt.compare(password, user.password, (err, result) => {
                if(result) {
                    req.session.userID = user._id;
                    res.status(200).redirect("/users/dashboard")
                }
            });
        }

    } catch(error) {
        res.status(400).json({
            status: "fail",
            error
        });
    }
}

exports.logoutUser = (req, res) => {
    req.session.destroy(() => {
        res.redirect("/");
    });
}

exports.getDashboardPage = async (req, res) => {
    const user = await User.findOne({_id: req.session.userID});

    res.render("dashboard", {
        page_name: "dashboard",
        user
    });
}