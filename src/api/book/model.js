import {Schema, model } from 'mongoose';

const bookSchema = new Schema({
    Stars: Number,
    Disount: Number,
    Title: String,
    Author: String,
    Price: Number,
    Cover: String,
    Comments: [String],

});

const Book = model("Book", bookSchema);

export default Book;