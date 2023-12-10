import { Router } from "express";
import {
  addPost,
  deletePost,
  getAllPosts,
  getPostById,
  updatePost,
  likePost,
  unlikePost,
  doILike,
} from "../controllers/post.js";

import { autheticate } from "../middlewares/auth.js";
import PostCommentRouter from "./posts_comment.js";

const PostRouter = Router();

/**
 * @swagger
 * tags:
 *   - name: Post
 *     description: Post related APIs
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Post:
 *       type: object
 *       required:
 *         - title
 *         - content
 *         - author
 *       properties:
 *         title:
 *           type: string
 *           trim: true
 *           description: Title of the post.
 *         content:
 *           type: string
 *           description: Content of the post.
 *         author:
 *           type: string
 *           description: The user ID of the post's author.
 *       example:
 *         title: "Example Post Title"
 *         content: "This is an example of post content."
 *         author: "5f50c31f4a9f4b3f3b58a5b1"  # Example User ID
 */

/**
 * @swagger
 * /posts:
 *   get:
 *     tags: [Post]
 *     summary: Retrieve a list of posts
 *     responses:
 *       200:
 *         description: A list of posts.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Post'
 */
PostRouter.get("/", getAllPosts);

/**
 * @swagger
 * /posts/{id}:
 *   get:
 *     tags: [Post]
 *     summary: Get a post by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Unique ID of the post
 *     responses:
 *       200:
 *         description: Detailed information about the post.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 */
PostRouter.get("/:id", getPostById);

/**
 * @swagger
 * /posts:
 *    post:
 *     tags: [Post]
 *     summary: Add a new post
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Post'
 *     responses:
 *       201:
 *         description: Post created successfully.
 */
PostRouter.post("/", autheticate, addPost);

/**
 * @swagger
 * /posts/{id}:
 *   put:
 *     tags: [Post]
 *     summary: Update an existing post
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Unique ID of the post
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Post'
 *     responses:
 *       200:
 *         description: Post updated successfully.
 */
PostRouter.put("/:id", autheticate, updatePost);

/**
 * @swagger
 * /posts/{id}:
 *   delete:
 *     tags: [Post]
 *     summary: Delete a post
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Unique ID of the post
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Post deleted successfully.
 */
PostRouter.delete("/:id", deletePost);

PostRouter.post("/:id/like", autheticate, likePost);
PostRouter.delete("/:id/like", autheticate, unlikePost);
PostRouter.get("/:id/doILike", autheticate, doILike);

PostRouter.use("/:postId/comments", PostCommentRouter);

export default PostRouter;
