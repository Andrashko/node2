import {Router} from "express";
import bookControler from "./controllerMogoose";

const bookRouter = new Router();
bookRouter.get("/", bookControler.get);
bookRouter.get("/:id", bookControler.getById);
bookRouter.post("/", bookControler.post);
bookRouter.delete("/:id",bookControler.delete);
bookRouter.patch("/:id", bookControler.patch);

export default bookRouter;