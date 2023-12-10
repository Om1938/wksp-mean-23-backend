import { Router } from "express";
import {
  addComment,
  deleteComment,
  getAllComments,
  getComment,
  updateComment,
} from "../controllers/comment.js";
import authenticate from "../middlewares/auth.js";

const CommentRouter = Router();

/**
 * @swagger
 * tags:
 *   - name: Comments
 *     description:  Comments APIs
 */

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
 * /comments:
 *   get:
 *     tags: [Comments]
 *     summary: Retrieve all comments
 *     responses:
 *       200:
 *         description: A list of all comments.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Comment'
 */
CommentRouter.get("/", getAllComments);

/**
 * @swagger
 * /comments/{id}:
 *   get:
 *     tags: [Comments]
 *     summary: Retrieve a comment by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique identifier of the comment
 *     responses:
 *       200:
 *         description: Detailed information about the comment.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Comment'
 */
CommentRouter.get("/:id", getComment);

/**
 * @swagger
 * /comments:
 *   post:
 *     tags: [Comments]
 *     summary: Add a new comment
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Comment'
 *     responses:
 *       201:
 *         description: New comment created successfully.
 */
CommentRouter.post("/", addComment);

/**
 * @swagger
 * /comments/{id}:
 *   put:
 *     tags: [Comments]
 *     summary: Update an existing comment
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique identifier of the comment
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Comment'
 *     responses:
 *       200:
 *         description: Comment updated successfully.
 */
CommentRouter.put("/:id", authenticate, updateComment);

/**
 * @swagger
 * /comments/{id}:
 *   delete:
 *     tags: [Comments]
 *     summary: Delete a comment
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique identifier of the comment
 *     responses:
 *       200:
 *         description: Comment deleted successfully.
 */
CommentRouter.delete("/:id", authenticate, deleteComment);

export default CommentRouter;
