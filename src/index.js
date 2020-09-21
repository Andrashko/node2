import express from "express";
import apiRouter from "./api";

const server = new express();


server.use(express.urlencoded());
server.use(express.json());
server.use ("/api", apiRouter);

server.listen(3000);

console.log("http://localhost:3000");
