import * as express from 'express';

export function createSessionHandler(req: express.Request, res: express.Response, next: express.NextFunction): void {
  next();
}
