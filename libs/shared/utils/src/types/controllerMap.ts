import { RequestHandler } from 'express';

export type ControllerMap = Record<string, RequestHandler>;
