import {Router} from "express";
import multer from "multer";

const fileRouter = new Router();
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "files/");
    }, 
    filename: (req, file, cb) =>{
        const filename = `${Date.now()}_${file.originalname}`; 
        cb(null, filename);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype == "image/jpeg")
        cb (null, true);
    else
        cb (new Error("Only images"));
}

const limits = {
    fileSize: 5*1024*1024
};

const imgUpload = multer({
    storage, 
    fileFilter,
    limits
});

fileRouter.post("/", imgUpload.single("image"), (req, res)=>{
    console.log(req);
    res.send(req.file);
});


export default fileRouter;