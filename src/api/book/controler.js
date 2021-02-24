import {
    MongoClient,
    ObjectID
} from 'mongodb';

const url = 'mongodb+srv://student:i295Anz59j94lTIE@cluster0.n9t74.gcp.mongodb.net/bookMongooseDB?retryWrites=true&w=majority'; // адреса сервера

const dbName = 'bookDB'; // назва Бази даних

const collectiionName = "books"; //назва колекції

function makeQueryObject(query) {
    let result = {};
    console.log(query);
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
    console.log(result);
    return result;
};


const bookControler = {
    get_async: async (req, res) => { //асинхронна функція
        try {
            const client = new MongoClient(url, {
                useUnifiedTopology: true
            }); // створюємо нового клієнта для підключення
            const connection = await client.connect(); // підключаємось
            const books = connection.db(dbName).collection(collectiionName); // вибираємо коллекцію            
            const result = await books
                .find(
                    //pages:  {$lte: 750},
                    //price: {$gt: 80},
                    //authors: {$elemMatch:{$eq:"Richard Helm"}}
                    //title: {$regex:".*node.*", $options:"i"}
                    makeQueryObject(req.query)
                )
                .toArray(); // дія (повернути всізаписи колекції)            
            res.send(result); // надіслати результат
            client.close(); //закрити підключення
        } catch (error) { // якщо сталася помилка
            console.log(error);
            res.status(500).send(error);
        }
    },
    get_promise: (req, res) => { // функція з промісами      
        const client = new MongoClient(url, {
            useUnifiedTopology: true
        }); // створюємо нового клієнта для підключення
        client.connect() // підключаємось
            .then(connection => {
                const books = connection.db(dbName).collection(collectiionName); // вибираємо коллекцію  
                books.find(makeQueryObject(req.query)).toArray()
                    .then(result => {
                        client.close();
                        res.send(result);
                    })
                    .catch(error => { // обробка помилки
                        throw error;
                    });
            })
            .catch(error => {
                console.log(error);
                res.status(500).send(error);
            });
    },
    get_callback: (req, res) => { // функція з колбеками  
        function logError(error){ //обробка помилки
            console.log(error);
            res.status(500).send(error);
        }   

        const client = new MongoClient(url, {
            useUnifiedTopology: true
        }); // створюємо нового клієнта для підключення
        client.connect(
            (error, connection) => { // підключаємось
                if (error) { // якщо помилка
                    logError(error);
                } else {
                    const books = connection.db(dbName).collection(collectiionName);
                    // вибираємо коллекцію  
                    books.find(makeQueryObject(req.query),
                        (error, result) => {
                            if (error) {
                                logError(error);
                            } else {
                                result.toArray(
                                    (error, result) => {
                                        if (error) {
                                            logError(error);
                                        } else {
                                            connection.close();
                                            res.send(result);
                                        }
                                    }
                                );
                            }
                        }
                    );

                }
            }
        );
    },
    getById: async (req, res) => {
        try {
            const client = new MongoClient(url, {
                useUnifiedTopology: true
            });

            const connection = await client.connect();
            const books = connection.db(dbName).collection(collectiionName);
            const result = await books.findOne({
                _id: ObjectID(req.params.id)
            }); // знайти
            if (result) //якщо знайшло
                res.send(result);
            else
                res.status(404).send("Not Found");
            client.close();
        } catch (error) {
            console.log(error);
            res.status(500).send(error);
        }
    },
    post: async (req, res) => {
        try {
            const client = new MongoClient(url, {
                useUnifiedTopology: true
            });

            const connection = await client.connect();
            const books = connection.db(dbName).collection(collectiionName);
            const result = await books.insertOne(req.body);
            res.send(result.ops);
            client.close();
        } catch (error) {
            console.log(error);
            res.status(500).send(error);
        }
    },
    delete: async (req, res) => {
        try {
            const client = new MongoClient(url, {
                useUnifiedTopology: true
            });

            const connection = await client.connect();
            const books = connection.db(dbName).collection(collectiionName);
            const result = await books.findOneAndDelete({
                _id: ObjectID(req.params.id)
            }, req.body);
            if (result)
                res.send(result);
            else
                res.status(404).send("Not Found");
            client.close();
        } catch (error) {
            console.log(error);
            res.status(500).send(error);
        }
    },
    patch: async (req, res) => {
        try {
            const client = new MongoClient(url, {
                useUnifiedTopology: true
            });

            const connection = await client.connect();
            const books = connection.db(dbName).collection(collectiionName);
            const result = await books.findOneAndUpdate({
                    _id: ObjectID(req.params.id)
                },
                {
                    $set: req.body
                }, );
            if (result.value)
                res.send(result.value);
            else
                res.status(404).send("Not Found");
            client.close();
        } catch (error) {
            console.log(error);
            res.status(500).send(error);
        }
    },
}

export default bookControler;