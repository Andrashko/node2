import {Router} from "express";
import authControler from "./controler";
import passport from "passport";

const authRouter = new Router();
authRouter.post("/register", authControler.register);
authRouter.post("/login", authControler.login);
authRouter.get("/", passport.authenticate("jwt", {session:false}));

export default authRouter;