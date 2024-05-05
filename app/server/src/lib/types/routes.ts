import type { NextFunction as ExpressNextFunction, Request as ExpressRequest, Response as ExpressResponse } from 'express';

import type { User } from '~shared/types';

type PlainObject = Record<string, unknown>;

export type Handler = (req: Request, res: Response) => unknown;

type Method = 'get' | 'head' | 'post' | 'put' | 'delete' | 'connect' | 'options' | 'trace' | 'patch';

export type Middleware = (req: Request, res: Response, next: Next) => unknown;

export type MiddlewareDebug = (error: Error, req: Request, res: Response, next: Next) => unknown;

export interface Next extends ExpressNextFunction { }

export interface Response<ResBody = unknown> extends ExpressResponse<ResBody> { }

export interface Request<ReqBody = unknown> extends ExpressRequest<PlainObject, object, ReqBody> {
	currentUser?: User | null;
}

export interface Route {
	method: Method;
	path: string | RegExp;
	middleware?: Middleware[];
	handler: Handler;
}
