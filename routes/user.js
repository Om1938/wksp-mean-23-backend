import { Router } from "express";
import User from "../models/user.js";

const UserRouter = Router();


UserRouter.get("/", (req, res) => {
  res.send("Hello Users!");
});

UserRouter.post("/", (req, res, next) => {
  const user = req.body;

  const userModel = new User(user);

  userModel.save()
    .then((data) => {
      res.json(data);
    })
    .catch(next);
    
})

export default UserRouter;
