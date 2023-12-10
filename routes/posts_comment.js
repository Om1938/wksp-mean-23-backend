import { Router } from "express";
import {
  addCommentToPostService,
  getCommentsByPostIdService,
} from "../services/post.js";
import autheticate from "../middlewares/auth.js";
import { addCommentToPost, getCommentsForPost } from "../controllers/post.js";

const PostCommentRouter = Router({ mergeParams: true });

/**
 * @swagger
 * components:
 *   schemas:
 *     Comment:
 *       type: object
 *       required:
 *         - content
 *         - author
 *         - post
 *       properties:
 *         content:
 *           type: string
 *           trim: true
 *           description: Content of the comment.
 *         author:
 *           type: string
 *           description: The user ID of the comment's author.
 *         post:
 *           type: string
 *           description: The post ID to which the comment is attached.
 *       example:
 *         content: "This is an example of a comment."
 *         author: "5f50c31f4a9f4b3f3b58a5b1"
 *         post: "5f50c31f4a9f4b3f3b58a5b2"
 */

/**
 * @swagger
 * /posts/{postId}/comments:
 *   get:
 *     tags: [Post]
 *     summary: Get all comments for a specific post
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: string
 *         description: Unique ID of the post for which comments are being retrieved
 *     responses:
 *       200:
 *         description: A list of comments for the specified post.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Comment'
 */
PostCommentRouter.get("/", getCommentsForPost);

/**
 * @swagger
 * /posts/{postId}/comments:
 *   post:
 *     tags: [Post]
 *     summary: Add a new comment to a specific post
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: string
 *         description: Unique ID of the post to which the comment is being added
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *                 description: Content of the comment.
 *             required:
 *               - content
 *     responses:
 *       201:
 *         description: New comment added successfully.
 */
PostCommentRouter.post("/", autheticate, addCommentToPost);

export default PostCommentRouter;
