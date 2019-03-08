import { Router } from 'express';

import userController from './user.controller';

const controllersRouter = Router();

// controllers
controllersRouter.use('/users', userController);

export default controllersRouter;
