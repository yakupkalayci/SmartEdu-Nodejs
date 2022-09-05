const express = require("express");
const mongoose = require("mongoose");
const ejs = require("ejs");

const pageRoute = require("./routes/pageRoute");
const courseRoute = require("./routes/courseRoute");

const app = express();

// Connect DB
mongoose.connect("mongodb://localhost/smartedu-DB")
    .then(() => console.log("DB Connected Succesfully!"))
    .catch(err => console.log(err));

//Middlewares
app.use(express.static("public"));

//Template Engine
app.set("view engine", "ejs"); 

//Routes
app.use("/", pageRoute);
app.use("/courses", courseRoute);


const port = 3000;
app.listen(port, () => console.log(`App is running on port ${port}`));