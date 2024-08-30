import { Router } from "express";

import Paths from "../common/Paths";
import PostServices from "../services/PostServices";
import multer from "multer";

// **** Variables **** //

const apiRouter = Router();

const postRouter = Router();


const upload = multer({dest: 'uploads/'});

postRouter.get(Paths.Post.Get, PostServices.getAll);
postRouter.post(Paths.Post.Add, upload.single("file"), PostServices.addOne);

apiRouter.use(Paths.Post.Base, postRouter);
// **** Export default **** //

export default apiRouter;
