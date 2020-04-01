const express = require("express");
const router = express.Router();
const moment = require("moment");
const multer = require("multer");
const path = require("path");
const User = require("../models/user.model");

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
router.get("/book", (req, res) => {
  Book.find()
    .populate()
    .then(books => {
      res.render("book/bookindex", { books, moment });
    }).catch(err => {
      console.log(err);
    })
    
});
router.get("/book/create",(req,res)=>{
  res.render("book/createbook")
});

router.post("/book/create", upload.single("imageupload"), (req, res, next) => {
  console.log(req.body);
  const file = req.file;
  if (!file) {
    const error = new Error("Please upload a file");
    error.httpStatusCode = 400;
    return next(error);
  }
  console.log(file.path);
  let book = new Book(req.body);
  book.imageupload = req.body.imageupload1;
  //save book
  book
    .save()
    .then((book) => {

    User.findByIdAndUpdate(req.user._id, {$push:{books:book}})
    .then( ()=> {
      res.redirect("/book/")
    } )

    })
    .catch(err => {
      console.log(err);
      res.send("Error!!!!!");
    });
});

router.get("/book/:id", (request, response) => {
  Book.findById(request.params.id)
      .then(book => {
      response.render("book/show", { book, moment });
      }).catch(err => {
          console.log(err);
          response.send("Error!!!!!");
      })
  })
router.delete("/book/:id/delete", (request, response) => {
   Book.findByIdAndDelete(request.params.id)
   .then(book => {
     response.redirect("/profile");
  }).catch(err => {
      console.log(err);
      response.send("Error!!!!!");
  })
})


router.get("/profile", (req,res)=>{
  User.findById(req.user._id).populate("books").populate("quotes")
  .then ((user)=>{
    let books = user.books
    let quotes = user.quotes
    res.render("user/profile", { books, quotes , moment:moment})
  })
})

router.post("/book/create/:id", (req, res) => {
  console.log(req.body);

  let book = new Book(req.body);
  book.imageupload = req.body.imageupload1;
  //save book
  book
    .save()
    .then((book) => {

    User.findByIdAndUpdate(req.user._id, {$push:{books:book}})
    .then( ()=> {
      res.redirect("/book/")
    } )

    })
    .catch(err => {
      console.log(err);
      res.send("Error!!!!!");
    });
});


module.exports = router

