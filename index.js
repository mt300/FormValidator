const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const session = require("express-session");
const flash = require("express-flash");

app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: {secure: true}
}));

app.use(flash());

app.get("/",(req,res)=>{
    res.send("Running");

});

app.listen(8080, (req,res) => {
    console.log("Server Running");
})