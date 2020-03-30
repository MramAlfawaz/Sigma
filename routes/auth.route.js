const router = require("express").Router();
const User = require("../models/user.model");
const passport = require("../config/ppConfig");
const isLoggedIn = require("../config/isLoggedin");
const { check, validationResult } = require("express-validator");


router.get("/auth/signup", (request, response) => {
  response.render("auth/signup");
});

router.post( "/auth/signup",
// adding validating ststment after npm validator
  [
    check("firstname").isLength({ min: 2 }), // there max
    check("lastname").isLength({ min: 2 }),
    // username must be an email
    check("email").isEmail(),
    // password must be at least 5 chars long
    // here we put restrict rather than in model db
    check("password").isLength({ min: 5 })
  ],
  (request, response) => {
    // first case if anyone make mistake in one of fourth
    // input validator run first case error
    const errors = validationResult(request); 
    console.log(errors);
    if (!errors.isEmpty()) {
      request.flash("autherror", errors.errors);
      return response.redirect("/auth/signup");
    }
     
    // second case no error
    let user = new User(request.body);
    user
      .save()
      .then(() => {
        //()()()()
        // response.redirect("/auth/signup") if i want user in after up
        // response.redirect("/home");
        //user login after registration
        passport.authenticate("local", {
          successRedirect: "/home",
          successFlash: "Account created and You have logged In!"
        })(request, response);
      })
      .catch(err => {
        // console.log(err);
        if (err.code == 11000) {
          console.log("Email Exists");
          request.flash("error", "Email Exists");
          return response.redirect("/auth/signup");
        }
        response.send("error!!!");
      });
  }
);

router.get("/auth/signin", (request, response) => {
  response.render("auth/signin");
});

//at signin page
router.post("/auth/signin",
  passport.authenticate("local", {
    successRedirect: "/home", // if pass correct open home page
    failureRedirect: "/auth/signin", // if incorrect ask re signin
    failureFlash: "Invalid Username or Password", //alert
    successFlash: "You have logged In!"
  })
);

// method in config 
router.get("/home", isLoggedIn, (request, response) => {
  // request.user
  User.find().then(users => {
    response.render("home", { users });
  });
});


router.get("/auth/logout", (request, response) => {
  request.logout(); //clear and break session
  request.flash("success", "Yay! your out!");
  response.redirect("/auth/signin");
});


router.get("/auth/setting", (request, response) => {
  response.render("auth/setting");
});


// router.post("/auth/setting", (request, response) => {
//   const newPassword = request.body.password;
//   User.findOneAndUpdate(newPassword);
//   response.redirect("/auth/signin");
// });


module.exports = router;