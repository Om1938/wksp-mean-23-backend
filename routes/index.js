import { Router } from "express";
import UserRouter from "./user.js";
import PostRouter from "./posts.js";
import AuthRouter from "./auth.js";
import CommentRouter from "./comment.js";

const IndexRouter = Router();

// Assigns the UserRouter to handle all requests starting with "/users".
// This means any route defined in UserRouter will be prefixed with "/users".
// For example, a route defined as "/" in UserRouter will be accessible as "/users/".
IndexRouter.use("/users", UserRouter);

// Assigns the PostRouter to handle all requests starting with "/posts".
// Similar to UserRouter, any route defined in PostRouter will have "/posts" as its prefix.
// So, a route defined as "/" in PostRouter will be accessible as "/posts/".
IndexRouter.use("/posts", PostRouter);

// Assigns the AuthRouter to handle all requests starting with "/auth".
// This router will typically handle authentication-related routes like login, logout, etc.
// A route defined as "/" in AuthRouter will be accessible as "/auth/".
IndexRouter.use("/auth", AuthRouter);

IndexRouter.use("/comments", CommentRouter);

export default IndexRouter;
