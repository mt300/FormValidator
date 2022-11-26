const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const session = require("express-session");
const flash = require("express-flash");
const cookieParser = require("cookie-parser");

app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use(cookieParser("oskoskosk")); //senha para gerar o cookie

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: {maxAge: 60000}
}));

app.use(flash());

app.get("/",(req,res)=>{
    var emailError = req.flash("emailError");
    var nameError = req.flash("nameError");
    var pointsError = req.flash("pointsError");
    var email = req.flash("email");
    var name = req.flash("name");
    var points = req.flash("points");

    emailError = (emailError == undefined || emailError.length == 0)? undefined : emailError;
    email = (email == undefined || email.length == 0) ? "" : email;
    res.render("index",{emailError,nameError,pointsError,email,name,points});

});

app.post("/form",(req,res) => {
    var {email,name,points} = req.body;
    var emailError;
    var nameError;
    var pointsError;

    if(email == undefined || email == ""){
        emailError = " Field email is empty! ";
    }
    if(name == undefined || name == "" || name == " "){
        nameError = " Field name is empty!";
    }
    if(points == undefined || points <= 0){
        pointsError = (points==undefined)?" Field points is empty!  ":" Field points can't be a negative number";
    }
    if( emailError != undefined || nameError != undefined || pointsError != undefined ){
        req.flash("emailError", emailError);
        req.flash("nameError",nameError);
        req.flash("pointsError",pointsError);
        req.flash("email", email);
        req.flash("name", name);
        req.flash("points", points);
        res.redirect("/");
    }else{
        res.send("ok")
    }
    
})

app.listen(8080, (req,res) => {
    console.log("Server Running");
})