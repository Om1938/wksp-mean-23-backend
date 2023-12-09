import {Router} from 'express'
import UserRouter from './user.js';
import PostRouter from './posts.js';
import AuthRouter from './auth.js';

const IndexRouter = Router();

IndexRouter.use("/users",UserRouter);
IndexRouter.use("/posts",PostRouter)
IndexRouter.use("/auth",AuthRouter)

export default IndexRouter;