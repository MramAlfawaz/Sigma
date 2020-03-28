require("dotenv").config();
const express = require("express");
const PORT = process.env.PORT;
const mongoose = require("mongoose");
const expressLayouts = require("express-ejs-layouts");
const authRoutes = require("./routes/auth.route");

//session connect with unique id for each user
const session = require("express-session");
const flash = require("connect-flash"); //alerts display msg on speceific time 

//passport like guard protect website allow authorized user  
let passport = require("./config/ppConfig");
const app = express();

mongoose.connect(
  process.env.MONGODB,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  },
  () => {
    console.log("mongdb connected!");
  },
  err => {
    console.log(err);
  }
);

mongoose.set("debug", true);
app.use(express.static("public")); //tells express to look in public for static files
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(expressLayouts);

//--must be before passport
// magic wand for session for security should put
// secret word in env file
app.use(
  session({
    secret: process.env.SECRET,
    saveUninitialized: true,
    resave: false
    // cookie: { maxAge: 360000 } //duration of session
  })
);
// to allow us using techniqes of passport
app.use(passport.initialize());
app.use(passport.session());

// to allow us using techniqes of flash alert
app.use(flash());

app.use(function(request, response, next) {
  response.locals.alerts = request.flash(); //displays one time messages
  response.locals.currentUser = request.user;
  console.log(response.locals.alerts);
  next();
});

app.use(authRoutes);

app.get("*", (request, response) => {
  response.send("doesnt exist yet!");
});

app.listen(PORT, () => console.log(`Express running ${PORT}`));