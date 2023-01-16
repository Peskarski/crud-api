import { IncomingMessage, ServerResponse } from 'http';
import { Route } from '../types';
import { responseHeader, Methods, StatusCodes } from '../httpServer/constants';
import resolveBody from './bodyResolver';
import resolveQueryParams from './queryParamsResolver';
import isUrlMatch from './urlChecker';
import errorHandler from '../errors/errorHandler';
import ApplicationError from '../errors';
import { ErrorMessages } from '../errors/constants';
import { isUuid } from './uuid';
import checkId from '../validators/IdChecker';
import validateBody from '../validators/bodyValidator';

const resolveAction = async (
  request: IncomingMessage,
  response: ServerResponse<IncomingMessage>,
  routes: Route[],
) => {
  try {
    const { url, method } = request;
    const lowerCaseMethod = method?.toLocaleLowerCase();

    const body = await resolveBody(request);
    const id = resolveQueryParams(url as string);

    const route = routes.find((r) => isUrlMatch(url as string, r.path)
      && r.method === lowerCaseMethod);

    if (!route) {
      throw new ApplicationError(StatusCodes.NOT_FOUND, ErrorMessages.NOT_EXISTING_ROUTE);
    }

    if (id && !isUuid(id)) {
      throw new ApplicationError(StatusCodes.BAD_REQUEST, ErrorMessages.NOT_VALID_UUID);
    }

    if (route.requiredFields) {
      validateBody(body, route.requiredFields);
    }

    const entries = await route?.controller.getAllUsers();
    if (id) {
      checkId(id, entries);
    }

    const actionFn = route?.controller[route.action].bind(route.controller);

    let result;

    if (lowerCaseMethod === Methods.GET) {
      if (id) {
        result = await actionFn(id);
      } else {
        result = await actionFn();
      }

      response.writeHead(StatusCodes.OK, responseHeader);
    }

    if (lowerCaseMethod === Methods.POST) {
      result = await actionFn(body);
      response.writeHead(StatusCodes.CREATED, responseHeader);
    }

    if (lowerCaseMethod === Methods.PUT) {
      result = await actionFn(id, body);
      response.writeHead(StatusCodes.OK, responseHeader);
    }

    if (lowerCaseMethod === Methods.DELETE) {
      result = await actionFn(id);
      response.writeHead(StatusCodes.DELETED, responseHeader);
    }

    response.end(JSON.stringify(result));
  } catch (error) {
    errorHandler(error as ApplicationError, response);
  }
};

export default resolveAction;
