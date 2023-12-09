import { Router } from "express";
import { addUser, getAllUsers, getUserById } from "../controllers/user.js";

const UserRouter = Router();

UserRouter.get("/",getAllUsers);
UserRouter.post("/", addUser);
UserRouter.get("/:id", getUserById);

export default UserRouter;
