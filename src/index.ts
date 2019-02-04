import * as fs from 'fs';
import * as path from 'path';

import * as bodyParser from 'body-parser';
import * as compression from 'compression';
import * as cookieParser from 'cookie-parser';
import * as express from 'express';
import * as useragent from 'express-useragent';
import * as firebaseAdmin from 'firebase-admin';
import * as logger from 'morgan';
import * as pug from 'pug';

import { config } from 'config';
import { experiments } from 'experiments';
import { authHandler } from 'handlers/authHandler';
import { createSessionHandler } from 'handlers/createSessionHandler';
import { homeHandler } from 'handlers/homeHandler';
import { privateHandler } from 'handlers/privateHandler';
import { signInHandler } from 'handlers/signInHandler';
import { signUpHandler } from 'handlers/signUpHandler';
import { HypothesisTesting } from 'utils/HypothesisTesting';

// tslint:disable-next-line:no-any no-var-requires no-require-imports
const serviceAccount: any = require('serviceAccountKey.json');

firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(serviceAccount),
  databaseURL: `https://${serviceAccount.project_id}.firebaseio.com`,
});

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
    // TODO: It's works under https only. Please use it on production.
    // secure: true,
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
  .use(bodyParser.json())
  .use(cookieParser());

app
  .get('/', preHandler, homeHandler)
  .get('/signup', preHandler, signUpHandler)
  .get('/signin', preHandler, signInHandler)
  .get('/private', preHandler, authHandler, privateHandler)
  .post('/sessions', createSessionHandler);

// Server
const APP_SERVER_PORT: number = Number(process.env.PORT || '3030');
app.listen(APP_SERVER_PORT, () => {
  // tslint:disable-next-line:no-console
  console.log(`Start app at ${new Date().toString()}.`);
  // tslint:disable-next-line:no-console
  console.log(`Open the site at http://localhost:${APP_SERVER_PORT}`);
});
