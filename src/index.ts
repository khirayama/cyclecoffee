import * as fs from 'fs';
import * as path from 'path';

import * as bodyParser from 'body-parser';
import * as compression from 'compression';
import * as cookieParser from 'cookie-parser';
import * as express from 'express';
import * as useragent from 'express-useragent';
import * as logger from 'morgan';
import * as pug from 'pug';

import { config } from 'config';
import {
  coffeeBeanAPIHandler,
  coffeeBeansAPIHandler,
  plansAPIHandler,
  shopAPIHandler,
  shopsAPIHandler,
} from 'handlers/apiMockHandlers';
import { appHandler } from 'handlers/appHandler';
import { coffeeBeanHandler } from 'handlers/coffeeBeanHandler';
import { homeHandler } from 'handlers/homeHandler';
import { shopHandler } from 'handlers/shopHandler';
import { ICoffeeBean, IPlan, IShop } from 'interfaces';

function preHandler(req: express.Request, res: express.Response, next: express.NextFunction): void {
  req.compiledFunction = pug.compileFile(path.resolve('dist', 'presentations', 'application', 'Layout.pug'), {
    basedir: path.resolve('dist', 'presentations'),
  });
  next();
}

function authMockHandler(req: express.Request, res: express.Response, next: express.Next): void {
  req.isSignedIn = req.cookies.session === 'true';
  next();
}

function signInMockHandler(req: express.Request, res: express.Response): void {
  res.cookie('session', true);
  res.redirect(req.headers.referer);
}

function signOutMockHandler(req: express.Request, res: express.Response): void {
  res.clearCookie('session');
  res.redirect(req.headers.referer);
}

const web: express.Router = express.Router();
const api: express.Router = express.Router();

web
  .use(preHandler)
  .use(authMockHandler)
  .get('/', homeHandler)
  .get('/app', appHandler)
  .get('/signin', signInMockHandler)
  .get('/signup', signInMockHandler)
  .get('/signout', signOutMockHandler)
  .get('/coffee-beans/:id', coffeeBeanHandler)
  .get('/shops/:id', shopHandler);
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
  // tslint:disable-next-line:no-console
  console.log(`Start app at ${new Date().toString()}.`);
  // tslint:disable-next-line:no-console
  console.log(`Open the site at http://localhost:${APP_SERVER_PORT}`);
});
