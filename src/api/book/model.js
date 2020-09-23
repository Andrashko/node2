import {Schema, model } from 'mongoose';

const bookSchema = new Schema({
    title: {
        type:String,
        required: true
    },
    authors: [String],
    isbn: String,
    published: Date,
    pages: Number,
    price: Number

});

const Book = model("Book", bookSchema);

export default Book;