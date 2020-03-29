const mongoose = require("mongoose");
const bookSchema = mongoose.Schema(
    {
        bookName: {
            type: String,
            required: true // that make input required user cannot skip it
        },
        description:{
            type:String,
        },
        pagesCount: {
            type: Number,

        },
        imageupload: {
            type: String,
        },
        bookUser: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
    }},
  { timestamps: true }
    );


// at user signup before her data stored in
// db hashing the password by this fun we can write it in server but 
// here more oganized
const Book = mongoose.model("Book", bookSchema);
module.exports = Book;