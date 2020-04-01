const express = require("express");
const router = express.Router();
const moment = require("moment");
const multer = require("multer");
const path = require("path");
var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "public/images");
  },
  filename: function(req, file, cb) {
    let fileExtension = path.extname(file.originalname).split(".")[1];
    cb(null, file.fieldname + "-" + Date.now() + "." + fileExtension);
  }
});
var upload = multer({ storage: storage });
const Book = require("../models/book.model");


router.get("/profile", (req, res) => {
  Book.find()
    .populate()
    .then(books => {
      res.render("profile/profile", { User, moment });
    }).catch(err => {
      console.log(err);
    })
    
});



  
  


router.delete("/profile/:id/delete", (request, response) => {
   Book.findByIdAndDelete(request.params.id)
   .then(book => {
      response.redirect("/profile");
  }).catch(err => {
      console.log(err);
      response.send("Error!!!!!");
  })
})

module.exports = router

