import { Router } from "express";
import {
  addUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "../controllers/user.js";

const UserRouter = Router();

/**
 * @swagger
 * tags:
 *   - name: User
 *     description: User Related APIs
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - username
 *         - email
 *         - password
 *       properties:
 *         username:
 *           type: string
 *           minLength: 3
 *           description: Unique username of the user.
 *         email:
 *           type: string
 *           format: email
 *           description: Email address of the user.
 *         password:
 *           type: string
 *           format: password
 *           description: Password for the user account.
 *       example:
 *         username: johndoe
 *         email: johndoe@example.com
 *         password: securePassword123
 */

/**
 * @swagger
 * /users:
 *   get:
 *     tags: [User]
 *     summary: Retrieve a list of users
 *     responses:
 *       200:
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
UserRouter.get("/", getAllUsers);

/**
 * @swagger
 * /users:
 *   post:
 *     tags: [User]
 *     summary: Add a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: User added successfully
 */
UserRouter.post("/", addUser);

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     tags: [User]
 *     summary: Get a user by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Unique id of the user
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Detailed user information
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 */
UserRouter.get("/:id", getUserById);

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     tags: [User]
 *     summary: Update a user's information
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Unique id of the user
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: User updated successfully
 */
UserRouter.put("/:id", updateUser);

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     tags: [User]
 *     summary: Delete a user
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Unique id of the user
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User deleted successfully
 */
UserRouter.delete("/:id", deleteUser);

export default UserRouter;
