import Book from "./model";
import mongoose from "mongoose";
//параметри бази
const bookControler = {
    connect: async () =>{
        const dbUrl = 'mongodb://localhost:27017/bookMongooseDB';
        try {
            await  mongoose.connect(dbUrl, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useFindAndModify: false  
            });
            console.log("DB connected"); 
        } catch (error){
            console.error(error);
            throw error;
        }
    },
    get: async (req, res) =>{
        try {
            const books = await Book.find();
            res.send(books);
        }
        catch (error){
            console.error(error);
            res.status(500).send(error);
        }
    },
    getById: async (req, res) =>{
        try {
            const book = await Book.findById(req.params.id);
            if (book) 
                res.send(book);
            else
                res.status(404).send("Not Found");             
        }
        catch (error){
            console.error(error);
            res.status(500).send(error);
        }
    },
    post: async (req, res) =>{
        try {
            const newBook = new Book(req.body);
            const book = await newBook.save();            
            res.send(book);             
        }
        catch (error){
            console.error(error);
            res.status(500).send(error);
        }
    },
    delete: async (req, res) =>{
        try {
            const book = await Book.findByIdAndDelete(req.params.id);
            if (book) 
                res.send(book);
            else
                res.status(404).send("Not Found");             
        }
        catch (error){
            console.error(error);
            res.status(500).send(error);
        }
    },
    patch: async (req, res) =>{
        try {
            const book = await Book.findOneAndUpdate(req.params.id, req.body, {
                returnOriginal: false
            } );
            if (book) 
                res.send(book);
            else
                res.status(404).send("Not Found");             
        }
        catch (error){
            console.error(error);
            res.status(500).send(error);
        }
    }
}

bookControler.connect ();
export default bookControler;