const express = require("express");
const app = express();
const cookieParser = require("cookie-parser")

// Cookie parser middleware
app.use(cookieParser("mysecret"));

// Cookies
app.get("/getcookies", (req, res)=>{
    res.cookie("hello", "world");
    res.cookie("name", "arslan");
    res.send("Sent cookies to you");
});

app.get("/signedcookie", (req, res)=>{
    res.cookie("country", "Pakistan", {signed: true});
    res.send("sent you signed cookie");
})

app.get("/", (req, res)=>{
    console.log(req.cookies);  // We can't directly access cookies we first parse it into JSON using the middleware cookie.parser(); // We can manualy add cookies
    res.send("I am root!");
});

// For printing cookie value
app.get("/name", (req, res)=>{
    let {name = "Name not found"} = req.cookies;
    res.send(`Name is ${name}`);
});

// To verify signed cookies
app.get("/verify", (req, res)=>{
    console.log(req.signedCookies);
    res.send("Verified")
})

app.listen(8888, ()=>{
    console.log("Server is running");
});