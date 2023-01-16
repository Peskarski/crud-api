import { StatusCodes, Methods } from './httpServer/constants';

export type Response = {
  statusCode: StatusCodes,
  result: unknown,
};

export type Request = { statusCode: StatusCodes; actionResult: object };

export interface Route {
  method: Methods;
  path: string;
  controller: any;
  action: string;
  requiredFields?: string[],
}

export type Action = {
  url?: string,
  method?: string,
};
