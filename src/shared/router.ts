import { Route } from './types';

class Router {
  private routes: Route[] = [];

  addRoute(route: Route) {
    this.routes.push(route);
  }

  getRoutes() {
    return this.routes;
  }
}

export default Router;
