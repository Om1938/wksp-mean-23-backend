import {Router} from 'express'
import UserRouter from './user.js';
import PostRouter from './posts.js';

const IndexRouter = Router();

IndexRouter.use("/users",UserRouter);
IndexRouter.use("/posts",PostRouter)




export default IndexRouter;