import Router from '../../shared/router';
import UserController from './controller';
import { Methods } from '../../shared/httpServer/constants';
import { UserActions } from './constants';

const userRouter = new Router();

userRouter.addRoute({
  path: '/api/users',
  method: Methods.GET,
  controller: UserController,
  action: UserActions.GET_ALL,
});

userRouter.addRoute({
  path: '/api/users/',
  method: Methods.GET,
  controller: UserController,
  action: UserActions.GET,
});

userRouter.addRoute({
  path: '/api/users/',
  method: Methods.PUT,
  controller: UserController,
  action: UserActions.PUT,
});

userRouter.addRoute({
  path: '/api/users',
  method: Methods.POST,
  controller: UserController,
  action: UserActions.POST,
});

userRouter.addRoute({
  path: '/api/users/',
  method: Methods.DELETE,
  controller: UserController,
  action: UserActions.DELETE,
});

export default userRouter;
