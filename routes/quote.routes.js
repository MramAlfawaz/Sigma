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


const Quote = require("../models/quote.model");

router.get("/quote", (req, res) => {
  Quote.find()
    .populate()
    .then(quotes => {
      res.render("quote/quoteindex", { quotes, moment });
    })
    .catch(err => {
      console.log(err);
    });
});

router.get("/quote/create", (req, res) => {
  res.render("quote/createquote");
});


router.post("/quote/create", upload.single("imageupload"), (req, res, next) => {
  console.log(req.body);
  const file = req.file;
  console.log(file);
  if (!file) {
    const error = new Error("Please upload a file");
    error.httpStatusCode = 400;
    return next(error);
  }
  console.log(file.path);
  let quote = new Quote(req.body);
  quote.imageupload = "/images/" + file.filename;
  //save book
  quote
    .save()
    .then(() => {
      res.redirect("/quote/")
    })
    .catch(err => {
      console.log(err);
      res.send("Error!!!!!");
    });
});

router.get("/quote/:id", (req, res) => {
  Quote.findById(req.params.id)
    .then(quote => {
      res.render("quote/show", { quote, moment });
    })
    .catch(err => {
      console.log(err);
      res.send("Error!!!!!");
    });
});
router.delete("/quote/:id/delete", (req, res) => {
  Quote.findByIdAndDelete(req.params.id)
    .then(quote => {
      res.redirect("/quote");
    })
    .catch(err => {
      console.log(err);
      res.send("Error!!!!!");
    });
});

module.exports = router;
