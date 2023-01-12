import { Route } from './types';

class Router {
  private routes: Route[] = [];

  addRoute({
    path, method, controller, action,
  }: Route) {
    this.routes.push({
      path,
      method,
      controller,
      action,
    });
  }

  getRoutes() {
    return this.routes;
  }
}

export default Router;
