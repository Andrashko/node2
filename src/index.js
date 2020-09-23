import express from "express";
import apiRouter from "./api";
import controllerMongoose from "./api/book/controllerMogoose";

const server = new express();


server.use(express.urlencoded());
server.use(express.json());
server.use("/api", apiRouter);
controllerMongoose.connect().then(() => {
    server.listen(3000);
    console.log("http://localhost:3000");
});
