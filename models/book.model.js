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


const Book = mongoose.model("Book", bookSchema);
module.exports = Book;