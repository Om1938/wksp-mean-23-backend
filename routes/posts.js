import { Router } from "express";

const PostRouter = Router();

PostRouter.get("/", (req, res) => {
    res.send("Hello Posts!");
    }
);

export default PostRouter;