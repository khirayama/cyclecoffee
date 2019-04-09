import * as path from 'path';

import * as bodyParser from 'body-parser';
import * as compression from 'compression';
import * as cookieParser from 'cookie-parser';
import * as express from 'express';
import * as useragent from 'express-useragent';
import * as logger from 'morgan';
import * as pug from 'pug';

import {
  coffeeBeanAPIHandler,
  coffeeBeansAPIHandler,
  plansAPIHandler,
  shopAPIHandler,
  shopsAPIHandler,
} from 'handlers/apiMockHandlers';
import { appHandler } from 'handlers/web/appHandler';
import { coffeeBeanHandler } from 'handlers/web/coffeeBeanHandler';
import { coffeeBeansHandler } from 'handlers/web/coffeeBeansHandler';
import { welcomeHandler } from 'handlers/web/welcomeHandler';
import { shopHandler } from 'handlers/web/shopHandler';

function preHandler(req: express.Request, res: express.Response, next: express.NextFunction): void {
  // Auth
  req.isSignedIn = !!req.cookies.session;
  // Template Engine
  req.compiledFunction = pug.compileFile(path.resolve('dist', 'presentations', 'application', 'Layout.pug'), {
    basedir: path.resolve('dist', 'presentations'),
  });
  next();
}

function authMockHandler(req: express.Request, res: express.Response, next: express.Next): void {
  if (!req.isSignedIn) {
    res.redirect('/welcome');
    return;
  }
  next();
}

function signInMockHandler(req: express.Request, res: express.Response): void {
  const session = {
    selectedCoffeeBeanIds: [],
    isSkipped: false,
    planId: null,
  };
  res.cookie('session', session);
  res.redirect('/');
}

function signOutMockHandler(req: express.Request, res: express.Response): void {
  res.clearCookie('session');
  res.redirect(req.headers.referer);
}

function helthCheckHandler(req: express.Request, res: express.Response): void {
  res.json({ status: 'OK' });
}

const web: express.Router = express.Router();
const api: express.Router = express.Router();

web
  .use(preHandler)
  .get('/', authMockHandler, appHandler)
  .get('/welcome', welcomeHandler)
  .get('/signin', signInMockHandler)
  .get('/signup', signInMockHandler)
  .get('/signout', signOutMockHandler)
  .get('/coffee-beans', coffeeBeansHandler)
  .get('/coffee-beans/:id', coffeeBeanHandler)
  .get('/shops/:id', shopHandler)
  .get('/helth-check', helthCheckHandler);
api
  .get('/coffee-beans', coffeeBeansAPIHandler)
  .get('/coffee-beans/:id', coffeeBeanAPIHandler)
  .get('/shops', shopsAPIHandler)
  .get('/shops/:id', shopAPIHandler)
  .get('/plans', plansAPIHandler);

const app: express = express();

app
  .use(logger('combined'))
  .use(useragent.express())
  .use(compression({ level: 9 }))
  .use(express.static(path.join(__dirname, 'assets')))
  .use(express.static(path.join(__dirname, 'public')))
  .use(bodyParser.json())
  .use(cookieParser());

app.use(web).use('/api', api);

const APP_SERVER_PORT: number = Number(process.env.PORT || '3030');
app.listen(APP_SERVER_PORT, () => {
  /* eslint-disable no-console */
  console.log(`Start app at ${new Date().toString()}.`);
  console.log(`Open the site at http://localhost:${APP_SERVER_PORT}`);
  /* eslint-enable no-console */
});
