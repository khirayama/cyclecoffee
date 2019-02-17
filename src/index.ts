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
import { coffeeBeanHandler } from 'handlers/coffeeBeanHandler';
import { homeHandler } from 'handlers/homeHandler';
import { shopHandler } from 'handlers/shopHandler';
import { ICoffeeBean, IPlan, IShop } from 'interfaces';

// tslint:disable-next-line:no-any
const compiledFunction: (options: { props: any }) => void = pug.compileFile(
  path.resolve('dist', 'presentations', 'application', 'Layout.pug'),
  {
    basedir: path.resolve('dist', 'presentations'),
  },
);

function preHandler(req: express.Request, res: express.Response, next: express.NextFunction): void {
  req.compiledFunction = compiledFunction;
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
  .use(cookieParser())
  .use(preHandler);

const web: express.Router = express.Router();
const api: express.Router = express.Router();

web
  .get('/', homeHandler)
  .get('/coffee-beans/:id', coffeeBeanHandler)
  .get('/shops/:id', shopHandler);
api
  .get('/coffee-beans', coffeeBeansAPIHandler)
  .get('/coffee-beans/:id', coffeeBeanAPIHandler)
  .get('/shops', shopsAPIHandler)
  .get('/shops/:id', shopAPIHandler)
  .get('/plans', plansAPIHandler);

app.use(web).use('/api', api);

// Server
const APP_SERVER_PORT: number = Number(process.env.PORT || '3030');
app.listen(APP_SERVER_PORT, () => {
  // tslint:disable-next-line:no-console
  console.log(`Start app at ${new Date().toString()}.`);
  // tslint:disable-next-line:no-console
  console.log(`Open the site at http://localhost:${APP_SERVER_PORT}`);
});
