import Book from "./model";

function makeQueryObject(query) {
    let result = {};
    if (query.maxpages && query.minpages) {
        result.pages = {
            $and: [{
                $lte: parseInt(query.maxpages)
            }, {
                $gte: parseInt(query.minpages)
            }]
        };
    }
    if (query.author) {
        result.authors = {
            $elemMatch: {
                $eq: query.author
            }
        }
    }
    if (query.maxprice) {
        result.price = {
            $lte: parseFloat(query.maxprice)
        }
    }
    return result;
};

const bookControler = {
 
    get: async (req, res) =>{
        try {
            const books = await Book.find(makeQueryObject(req.query));
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
            console.log(req.params.id, req.body);
            const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
                returnOriginal: false
            } );
            if (book) 
                res.send(book);
            else
                res.status(404).send("Not Found");             
        }
        catch (error){
            res.status(500).send(error);
        }
    },
    put: async (req,res)=>{
        try{
            let arr = req.body;
            if (arr && arr.length)
            {
                const books = await Book.insertMany(arr);
                res.send(books);
            }
        } catch (e){
            res.status(500).send(e);
        }
    }
}


export default bookControler;