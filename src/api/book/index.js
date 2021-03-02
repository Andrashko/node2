import {Router} from "express";
import passport from "passport";
import bookControler from "./controllerMogoose";


const bookRouter = new Router();
bookRouter.get("/", bookControler.get);
bookRouter.get("/:id", bookControler.getById);
bookRouter.post("/",  bookControler.post);
bookRouter.delete("/:id",  bookControler.delete);
bookRouter.patch("/:id",  bookControler.patch);
// bookRouter.put("/", bookControler.put);

export default bookRouter;