import { IncomingMessage, ServerResponse } from 'http';
import { Route } from '../types';
import { responseHeader } from '../httpServer/constants';
import resolveBody from './bodyResolver';
import resolveQueryParams from './queryParamsResolver';
import isUrlMatch from './urlChecker';

const resolveAction = async (
  request: IncomingMessage,
  response: ServerResponse<IncomingMessage>,
  routes: Route[],
) => {
  const { url, method } = request;

  const body = await resolveBody(request);
  const id = resolveQueryParams(url as string);

  const route = routes.find((r) => isUrlMatch(url as string, r.path)
    && r.method === method?.toLocaleLowerCase());

  const actionFn = route?.controller[route.action].bind(route.controller);

  let result;

  if (id && !body) {
    result = await actionFn(id);
  }

  if (id && body) {
    result = await actionFn(id, body);
  }

  if (body && !id) {
    result = await actionFn(body);
  }

  if (!id && !body) {
    result = await actionFn();
  }

  // const result = await actionFn(body);

  response.writeHead(200, responseHeader);
  response.end(JSON.stringify(result));
};

export default resolveAction;
