const mongoose = require("mongoose");
const QuoteSchema = mongoose.Schema(
    {
        quote: {
            type: String,
            required: true // that make input required user cannot skip it
        },

        auther: {
            type: String,
            required: true
        },
        imageupload: {
            type: String,
        },
        quoteUser: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    },
    { timestamps: true }
);



const Quote = mongoose.model("Quote", QuoteSchema);
module.exports = Quote;