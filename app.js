const express = require("express");
const mongoose = require("mongoose");
const session = require('express-session');
const MongoStore = require('connect-mongo');
const ejs = require("ejs");
const flash = require("connect-flash");


const pageRoute = require("./routes/pageRoute");
const courseRoute = require("./routes/courseRoute");
const categoryRoute = require("./routes/categoryRoute");
const userRoute = require("./routes/userRoute");

const app = express();

// Connect DB
mongoose.connect("mongodb://localhost/smartedu-DB")
    .then(() => console.log("DB Connected Succesfully!"))
    .catch(err => console.log(err));

// Global Variable
global.userIN = null;

//Middlewares
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({mongoUrl: "mongodb://localhost/smartedu-DB"})
}));
app.use(flash());
app.use((req, res, next) => {
    res.locals.flashMessages = req.flash();
    next();
});

//Template Engine
app.set("view engine", "ejs"); 

//Routes
app.use("*", (req, res, next) => {
    userIN = req.session.userID;
    next();
});
app.use("/", pageRoute);
app.use("/courses", courseRoute);
app.use("/categories", categoryRoute);
app.use("/users", userRoute);


const port = 3000;
app.listen(port, () => console.log(`App is running on port ${port}`));