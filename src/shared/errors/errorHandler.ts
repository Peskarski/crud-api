import { IncomingMessage, ServerResponse } from 'http';
import { StatusCodes, responseHeader } from '../httpServer/constants';
import ApplicationError from '.';

const errorHandler = (error: ApplicationError, response: ServerResponse<IncomingMessage>) => {
  response.writeHead(error.code || StatusCodes.NOT_FOUND, responseHeader);
  response.end(error.message);
};

export default errorHandler;
