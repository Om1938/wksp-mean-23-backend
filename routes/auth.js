import { Router } from "express";

import { login } from "../controllers/auth.js";

const AuthRouter = Router();

// AuthRouter.post("/register", register);
AuthRouter.post("/login", login);

export default AuthRouter;