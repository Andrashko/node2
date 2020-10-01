import express from "express";
import mongoose from "mongoose";
import fs from "fs";
import https from "https";
import apiRouter from "./api";


const dbUrl = 'mongodb://localhost:27017/bookMongooseDB';
const dbOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
};
mongoose.connect(dbUrl, dbOptions)
    .then(() => {
        try {
            console.log("DB connected");

            const server = express();

            server.use(express.urlencoded());
            server.use(express.json());
            server.use("/api", apiRouter);

            server.use((req, res, next) => { //переадресування всіх запитів з http з https
                if (req.header('x-forwarded-proto') !== 'https')
                    res.redirect(`https://${req.header('host')}${req.url}`);
                else
                    next();
            });

            const options = {
                key: fs.readFileSync('./secret/key.pem'),
                cert: fs.readFileSync('./secret/cert.pem'),
                ca: fs.readFileSync("./secret/rootCA.pem")
            };

            const httpsServer = https.createServer(options, server);
            httpsServer.listen(3443);
            console.log("https://localhost:3443");
            server.listen(3000);
            console.log("http://localhost:3000");

        } catch (e) {
            console.error(e);
        }
    })
    .catch(error => {
        console.error(error);
    });

