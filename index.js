const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const session = require("express-session");
const flash = require("express-flash");
const cookieParser = require("cookie-parser");

app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use(cookieParser("asdkadka"))

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: {maxAge: 60000}
}));

app.use(flash());

app.get("/",(req,res)=>{
    res.render("index");

});

app.post("/form",(req,res) => {
    var {email,name,points} = req.body;
    var emailError;
    var nameError;
    var pointsError;

    if(email == undefined || email == ""){
        emailError = " email error ";
    }
    if(name == undefined || name == ""){
        nameError = " name error ";
    }
    if(points == undefined || points <= 0){
        pointsError = " points error ";
    }
    if( emailError != undefined || nameError != undefined || pointsError != undefined ){
        res.redirect("/");
    }else{
        res.send("ok")
    }
    
})

app.listen(8080, (req,res) => {
    console.log("Server Running");
})