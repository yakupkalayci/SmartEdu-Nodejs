const express = require("express");
const ejs = require("ejs");

const pageRoute = require("./routes/pageRoute");

const app = express();

//Middlewares
app.use(express.static("public"));

//Template Engine
app.set("view engine", "ejs"); 

//Routes
app.use("/", pageRoute);


const port = 3000;
app.listen(port, () => console.log(`App is running on port ${port}`));