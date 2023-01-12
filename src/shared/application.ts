import { createServer } from 'http';
import * as dotenv from 'dotenv';
import Router from './router';
import resolveAction from './helpers/actionResolver';

dotenv.config();

const port = process.env.API_PORT;

class Application {
  router: Router;

  constructor(router: Router) {
    this.router = router;
  }

  createServer() {
    const appServer = createServer(async (req, res) => {
      const routes = this.router.getRoutes();

      resolveAction(req, res, routes);
    });

    appServer.listen(port, () => {
      console.log(`server started on port: ${port}`);
    });
  }
}

export default Application;
