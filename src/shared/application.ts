import {
  createServer, IncomingMessage, Server, ServerResponse,
} from 'http';
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

  appServer: Server<typeof IncomingMessage, typeof ServerResponse> | undefined;

  createServer() {
    this.appServer = createServer(async (req, res) => {
      const routes = this.router.getRoutes();

      resolveAction(req, res, routes);
    });

    this.appServer.listen(port, () => {
      console.log(`server started on port: ${port}`);
    });
  }

  getServer() {
    return this.appServer;
  }

  stopServer() {
    this.appServer?.close();
  }
}

export default Application;
