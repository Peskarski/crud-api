import {
  createServer, IncomingMessage, Server, ServerResponse, request,
} from 'http';
import * as dotenv from 'dotenv';
import { cpus } from 'node:os';
import cluster from 'node:cluster';
import Router from './router';
import resolveAction from './helpers/actionResolver';

dotenv.config();

const mainPort = Number(process.env.API_PORT);
let requestIteration = 0;

const cpusLength = cpus().length;

class Application {
  router: Router;

  constructor(router: Router) {
    this.router = router;
  }

  appServer: Server<typeof IncomingMessage, typeof ServerResponse> | undefined;

  createServer(portNumber = mainPort) {
    this.appServer = createServer(async (req, res) => {
      const routes = this.router.getRoutes();

      resolveAction(req, res, routes);
    });

    this.appServer.listen(portNumber, () => {
      if (portNumber === mainPort) {
        console.log(`server started on port: ${mainPort}`);
      }
    });
  }

  createMultiServer() {
    if (cluster.isPrimary) {
      for (let cpuIndex = 0; cpuIndex < cpusLength; cpuIndex += 1) {
        cluster.fork();
      }

      cluster.on('exit', () => {
        cluster.fork();
      });

      this.appServer = createServer(async (req, res) => {
        const clusterPort = this.getNextPort();

        const routes = this.router.getRoutes();

        resolveAction(req, res, routes);

        req.pipe(request({ port: clusterPort }, (response) => {
          response.pipe(res);
        }));
      });

      this.appServer.listen(mainPort, () => {
        console.log(`server started on port: ${mainPort}`);
      });
    } else {
      const clusterPort = mainPort + (cluster.worker?.id ?? 0);
      this.createServer(clusterPort);
    }
  }

  getNextPort() {
    requestIteration = requestIteration === cpusLength ? 1 : requestIteration + 1;

    return mainPort + requestIteration;
  }

  getServer() {
    return this.appServer;
  }

  stopServer() {
    this.appServer?.close();
  }
}

export default Application;
