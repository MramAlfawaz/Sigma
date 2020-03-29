const express = require("express");
const router = express.Router();
const moment = require("moment");


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
router.post("/quote/create", (req, res) => {
  console.log(req.body);
   let quote = new Quote(req.body);
  //save book
  quote
    .save()
    .then(() => {
      res.redirect("/quote/");
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
