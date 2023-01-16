import { IncomingMessage, ServerResponse } from 'http';
import { StatusCodes, responseHeader } from '../httpServer/constants';
import { ErrorMessages } from './constants';
import ApplicationError from '.';

const errorHandler = (error: ApplicationError, response: ServerResponse<IncomingMessage>) => {
  response.writeHead(error.code || StatusCodes.SERVER_ERROR, responseHeader);
  response.end(error.message || ErrorMessages.SERVER_ERROR);
};

export default errorHandler;
