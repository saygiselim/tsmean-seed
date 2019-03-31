import { Router } from 'express';

// services
import { AuthService } from '../services/auth.service';

// controllers
import authController from './auth.controller';
import userController from './user.controller';
import postController from './post.controller';

const authService = new AuthService();
const controllersRouter = Router();

// unsecured routes
controllersRouter.use('/auth', authController);

// authentication checker
controllersRouter.use((req, res, next) => authService.checkAuthentication(req, res, next));

// secured routes
controllersRouter.use('/users', userController);
controllersRouter.use('/users/:userId/posts', postController);

export default controllersRouter;
