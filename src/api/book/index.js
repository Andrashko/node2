import {Router} from "express";
import passport from "passport";
import bookControler from "./controllerMogoose";


const bookRouter = new Router();
bookRouter.get("/", bookControler.get);
bookRouter.get("/:id", bookControler.getById);
bookRouter.post("/",  passport.authenticate("jwt", {session:false}), bookControler.post);
bookRouter.delete("/:id", passport.authenticate("jwt", {session:false}),  bookControler.delete);
bookRouter.patch("/:id",  passport.authenticate("jwt", {session:false}), bookControler.patch);
bookRouter.put("/", passport.authenticate("jwt", {session:false}), bookControler.put);

export default bookRouter;