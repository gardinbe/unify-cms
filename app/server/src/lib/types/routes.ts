import type { Request as ExpressRequest, Response as ExpressResponse, NextFunction as ExpressNextFunction } from 'express';
import type { User } from '~shared/types';

type PlainObject = Record<string, unknown>;

export type Handler = (req: Request, res: Response) => unknown;

type Method = 'get' | 'head' | 'post' | 'put' | 'delete' | 'connect' | 'options' | 'trace' | 'patch';

export type Middleware = (req: Request, res: Response, next: Next) => unknown;

export type MiddlewareDebug = (error: Error, req: Request, res: Response, next: Next) => unknown;

export interface Next extends ExpressNextFunction { }

export interface Response<ResBody extends object = object> extends ExpressResponse<ResBody> { }

export interface Request<ReqBody extends object = object> extends ExpressRequest<PlainObject, object, ReqBody> {
	currentUser?: User | null;
}

export interface Route {
	method: Method;
	path: string | RegExp;
	middleware?: Middleware[];
	handler: Handler;
}
