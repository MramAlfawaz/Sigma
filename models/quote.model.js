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
        quoteUser: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    },
    { timestamps: true }
);


// at user signup before her data stored in
// db hashing the password by this fun we can write it in server but 
// here more oganized
const Quote = mongoose.model("Quote", QuoteSchema);
module.exports = Quote;