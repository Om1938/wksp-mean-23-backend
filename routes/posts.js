import { Router } from "express";
import { addPost, deletePost, getAllPosts, getPostById, updatePost } from "../controllers/post.js";

const PostRouter = Router();

PostRouter.get("/", getAllPosts);
PostRouter.get("/:id", getPostById);
PostRouter.post("/", addPost);
PostRouter.put("/:id", updatePost);
PostRouter.delete("/:id", deletePost);

export default PostRouter;