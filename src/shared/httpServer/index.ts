import { createServer } from 'http';
import * as dotenv from 'dotenv';
import { StatusCodes } from './constants';

dotenv.config();

const port = process.env.API_PORT;

const server = () => {
  const appServer = createServer(async (req, res) => {
    // if (req.url === '/api/users' && req.method === 'GET') {
    res.writeHead(StatusCodes.OK, { 'Content-Type': 'application/json' });
    res.write('Hi there, This is a Vanilla Node.js API');
    // }
  });

  appServer.listen(port, () => {
    console.log(`server started on port: ${port}`);
  });
};

export default server;
