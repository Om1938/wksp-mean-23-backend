import { Router } from "express";

const UserRouter = Router();

UserRouter.get("/", (req, res) => {
  res.send("Hello Users!");
});

export default UserRouter;
