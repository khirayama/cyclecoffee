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
  req.compiledFunction = pug.compileFile(path.resolve('dist', 'presentations', 'application', 'Layout.pug'), { basedir });
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

const web: express.Router = express.Router();
const auth: express.Router = express.Router();
const api: express.Router = express.Router();
const admin: express.Router = express.Router();

web
  .use(preHandler)
  .get('/', authMockHandler, appHandler)
  .get('/welcome', welcomeHandler)
  .get('/signin', signInHandler)
  .get('/signup', signInMockHandler)
  .get('/coffee-beans', coffeeBeansHandler)
  .get('/coffee-beans/:id', coffeeBeanHandler)
  .get('/shops/:id', shopHandler)
  .get('/orders', (req: express.Request, res: express.Response) => res.json('ordersHandler'))
  .get('/orders/:id', (req: express.Request, res: express.Response) => res.json('orderHandler'))
  .get('/profile', (req: express.Request, res: express.Response) => res.json('profileHandler'))
  .get('/helth-check', (req: express.Request, res: express.Response) => res.json({ status: 'OK' }));
admin
  .use(adminAuthMockHandler)
  .get('/coffee-beans/new', (req: express.Request, res: express.Response) => res.json('newCoffeeBeanHandler'))
  .get('/coffee-beans/:id/edit', (req: express.Request, res: express.Response) => res.json('editCoffeeBeanHandler'))
  .get('/shops/new', (req: express.Request, res: express.Response) => res.json('newCoffeeBeanHandler'))
  .get('/shops/:id/edit', (req: express.Request, res: express.Response) => res.json('editCoffeeBeanHandler'))
  .get('/orders', (req: express.Request, res: express.Response) => res.json('ordersAdminHandler'))
  .get('/orders/:id', (req: express.Request, res: express.Response) => res.json('orderAdminHandler'));
auth
  .post('/sessions', createSessionHandler)
  .delete('/session', (req: express.Request, res: express.Response) => res.json('deleteSessionHandler'))
  .delete('/user', (req: express.Request, res: express.Response) => res.json('deleteUserHandler'));
api
  .post('/coffee-beans', adminAuthMockHandler, (req: express.Request, res: express.Response) => res.json('createCoffeeBeanHandler'))
  .get('/coffee-beans', coffeeBeansAPIHandler)
  .get('/coffee-beans/:id', coffeeBeanAPIHandler)
  .put('/coffee-beans/:id', adminAuthMockHandler, (req: express.Request, res: express.Response) => res.json('updateCoffeeBeanHandler'))
  .delete('/coffee-beans/:id', adminAuthMockHandler, (req: express.Request, res: express.Response) => res.json('destroyCoffeeBeanHandler'))
  .post('/shops', adminAuthMockHandler, (req: express.Request, res: express.Response) => res.json('createShopHandler'))
  .get('/shops', shopsAPIHandler)
  .get('/shops/:id', shopAPIHandler)
  .put('/shops/:id', adminAuthMockHandler, (req: express.Request, res: express.Response) => res.json('updateShopHandler'))
  .delete('/shops/:id', adminAuthMockHandler, (req: express.Request, res: express.Response) => res.json('destroyShopHandler'))
  .post('/orders', (req: express.Request, res: express.Response) => res.json('createOrderHandler'))
  .get('/orders', (req: express.Request, res: express.Response) => res.json('ordersHandler'))
  .get('/orders/:id', (req: express.Request, res: express.Response) => res.json('orderHandler'))
  .delete('/orders', (req: express.Request, res: express.Response) => res.json('destroyOrderHandler'))
  .post('/profile', (req: express.Request, res: express.Response) => res.json('createProfileHandler'))
  .get('/profile', (req: express.Request, res: express.Response) => res.json('profileHandler'))
  .put('/profile', (req: express.Request, res: express.Response) => res.json('updateProfileHandler'))
  .delete('/profile', (req: express.Request, res: express.Response) => res.json('destroyProfileHandler'))
  .post('/plans', adminAuthMockHandler, (req: express.Request, res: express.Response) => res.json('createPlanHandler'))
  .get('/plans', plansAPIHandler)
  .put('/plans/:id', adminAuthMockHandler, (req: express.Request, res: express.Response) => res.json('updatePlanHandler'))
  .delete('/plans/:id', adminAuthMockHandler, (req: express.Request, res: express.Response) => res.json('destroyPlanHandler'))
  .get('/subscriptions', (req: express.Request, res: express.Response) => res.json('subscriptionsHandler'));

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
  .use('/admin', admin)
  .use('/auth', auth)
  .use('/api', api);

const APP_SERVER_PORT: number = Number(process.env.PORT || '3030');
app.listen(APP_SERVER_PORT, () => {
  /* eslint-disable no-console */
  console.log(`Start app at ${new Date().toString()}.`);
  console.log(`Open the site at http://localhost:${APP_SERVER_PORT}`);
  /* eslint-enable no-console */
});
