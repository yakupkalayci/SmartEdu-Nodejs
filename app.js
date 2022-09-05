const express = require("express");
const ejs = require("ejs");

const app = express();

//Middlewares
app.use(express.static("public"));

//Template Engine
app.set("view engine", "ejs"); 

//Routes
app.get("/", (req, res) => {
    res.status(200).render("index", {
        page_name: "index"
    });
});

app.get("/about", (req, res) => {
    res.status(200).render("about", {
        page_name: "about"
    });
});


const port = 3000;
app.listen(port, () => console.log(`App is running on port ${port}`));