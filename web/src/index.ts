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
} from 'handlers/api';
import { createSessionHandler } from 'handlers/auth';
import { appHandler } from 'handlers/web/appHandler';
import { coffeeBeanHandler } from 'handlers/web/coffeeBeanHandler';
import { coffeeBeansHandler } from 'handlers/web/coffeeBeansHandler';
import { welcomeHandler } from 'handlers/web/welcomeHandler';
import { shopHandler } from 'handlers/web/shopHandler';
import { signInHandler } from 'handlers/web/signInHandler';

function preHandler(req: express.Request, res: express.Response, next: express.NextFunction): void {
  // Template Engine
  const basedir: string = path.resolve('dist', 'presentations');
  const layoutPath: string = path.resolve('dist', 'presentations', 'application', 'Layout.pug');
  req.compiledFunction = pug.compileFile(layoutPath, { basedir });
  next();
}

function authMockHandler(req: express.Request, res: express.Response, next: express.Next): void {
  next();
}

function adminAuthMockHandler(req: express.Request, res: express.Response, next: express.Next): void {
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

function tmpHandler(req: express.Request, res: express.Response): void {
  res.json({ path: 'tmp' });
}

const web: express.Router = express.Router();
const auth: express.Router = express.Router();
const api: express.Router = express.Router();

web
  .use(preHandler)
  .get('/', authMockHandler, appHandler)
  .get('/welcome', welcomeHandler)
  .get('/signin', signInHandler)
  .get('/signup', signInMockHandler)
  .get('/coffee-beans', coffeeBeansHandler)
  .get('/coffee-beans/:id', coffeeBeanHandler)
  .get('/shops/:id', shopHandler)
  .get('/orders', authMockHandler, tmpHandler)
  .get('/orders/:id', authMockHandler, tmpHandler)
  .get('/profile', authMockHandler, tmpHandler)
  .get('/coffee-beans/new', adminAuthMockHandler, tmpHandler)
  .get('/coffee-beans/:id/edit', adminAuthMockHandler, tmpHandler)
  .get('/shops/new', adminAuthMockHandler, tmpHandler)
  .get('/shops/:id/edit', adminAuthMockHandler, tmpHandler)
  .get('/admin/orders', adminAuthMockHandler, tmpHandler)
  .get('/admin/orders/:id', adminAuthMockHandler, tmpHandler)
  .get('/helth-check', (req: express.Request, res: express.Response) => res.json({ status: 'OK' }));
auth
  .post('/sessions', createSessionHandler)
  .delete('/session', (req: express.Request, res: express.Response) => res.json('deleteSessionHandler'))
  .delete('/user', (req: express.Request, res: express.Response) => res.json('deleteUserHandler'));
api
  .post('/coffee-beans', adminAuthMockHandler, tmpHandler)
  .get('/coffee-beans', coffeeBeansAPIHandler)
  .get('/coffee-beans/:id', coffeeBeanAPIHandler)
  .put('/coffee-beans/:id', adminAuthMockHandler, tmpHandler)
  .delete('/coffee-beans/:id', adminAuthMockHandler, tmpHandler)
  .post('/shops', adminAuthMockHandler, tmpHandler)
  .get('/shops', shopsAPIHandler)
  .get('/shops/:id', shopAPIHandler)
  .put('/shops/:id', adminAuthMockHandler, tmpHandler)
  .delete('/shops/:id', adminAuthMockHandler, tmpHandler)
  .post('/orders', tmpHandler)
  .get('/orders', tmpHandler)
  .get('/orders/:id', tmpHandler)
  .delete('/orders', tmpHandler)
  .post('/profile', tmpHandler)
  .get('/profile', tmpHandler)
  .put('/profile', tmpHandler)
  .delete('/profile', tmpHandler)
  .post('/plans', adminAuthMockHandler, tmpHandler)
  .get('/plans', plansAPIHandler)
  .put('/plans/:id', adminAuthMockHandler, tmpHandler)
  .delete('/plans/:id', adminAuthMockHandler, tmpHandler)
  .get('/subscriptions', tmpHandler);

const app: express = express();

app
  .use(logger('combined'))
  .use(useragent.express())
  .use(compression({ level: 9 }))
  .use(express.static(path.join(__dirname, 'assets')))
  .use(express.static(path.join(__dirname, 'public')))
  .use(bodyParser.json())
  .use(cookieParser())
  .use('/', web)
  .use('/auth', auth)
  .use('/api', api);

const APP_SERVER_PORT: number = Number(process.env.PORT || '3030');
app.listen(APP_SERVER_PORT, () => {
  /* eslint-disable no-console */
  console.log(`Start app at ${new Date().toString()}.`);
  console.log(`Open the site at http://localhost:${APP_SERVER_PORT}`);
  /* eslint-enable no-console */
});
