import * as fs from 'fs';
import * as path from 'path';

import * as compression from 'compression';
import * as cookieParser from 'cookie-parser';
import * as express from 'express';
import * as useragent from 'express-useragent';
import * as logger from 'morgan';
import * as pug from 'pug';

import { config } from 'config';
import { experiments } from 'experiments';
import { homeHandler } from 'handlers/homeHandler';
import { authHandler, privateHandler } from 'handlers/privateHandler';
import { HypothesisTesting } from 'utils/HypothesisTesting';

// tslint:disable-next-line:no-any
const compiledFunction: (options: { props: any }) => void = pug.compileFile(
  path.resolve('dist', 'presentations', 'application', 'Layout.pug'),
  {
    basedir: path.resolve('dist', 'presentations'),
  },
);

const hypothesisTesting: HypothesisTesting = new HypothesisTesting(experiments);
// const topPageSegment: string = req.hypothesisTesting.segment('top-page1', req.segId);

function preHandler(req: express.Request, res: express.Response, next: express.NextFunction): void {
  req.compiledFunction = compiledFunction;

  // For AB Testing
  const segId: string = req.cookies._seg_id || hypothesisTesting.getSegId();
  res.cookie('_seg_id', segId, {
    maxAge: 31536000,
    httpOnly: true,
  });
  req.segId = segId;
  req.hypothesisTesting = hypothesisTesting;

  next();
}

const app: express = express();

app
  .use(logger('combined'))
  .use(useragent.express())
  .use(compression({ level: 9 }))
  .use(express.static(path.join(__dirname, 'assets')))
  .use(express.static(path.join(__dirname, 'public')))
  .use(cookieParser());

app.get('/', preHandler, homeHandler).get('/private', preHandler, authHandler, privateHandler);

// Server
const APP_SERVER_PORT: number = Number(process.env.PORT || '3030');
app.listen(APP_SERVER_PORT, () => {
  // tslint:disable-next-line:no-console
  console.log(`Start app at ${new Date().toString()}.`);
  // tslint:disable-next-line:no-console
  console.log(`Open the site at http://localhost:${APP_SERVER_PORT}`);
});
