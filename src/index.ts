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
  .get('/coffee-beans', (req: express.Request, res: express.Response) => {
    const coffeeBeans: ICoffeeBean[] = [
      {
        id: 'gohobi',
        name: 'ごほうびブレンド',
        description: 'ごほうびブレンド説明',
        shopId: 'saredo',
        imageUrl: '/images/coffee_bean_sample.jpg',
      },
      {
        id: 'horoniga',
        name: 'ほろにがブレンド',
        description: 'ほろにがブレンド説明',
        shopId: 'saredo',
        imageUrl: '/images/coffee_bean_sample.jpg',
      },
      {
        id: 'Ethiopia',
        name: 'エチオピア',
        description: 'エチオピア説明',
        shopId: 'saredo',
        imageUrl: '/images/coffee_bean_sample.jpg',
      },
    ];
    res.json(coffeeBeans);
  })
  .get('/coffee-beans/:id', (req: express.Request, res: express.Response) => {
    const coffeeBean: ICoffeeBean = {
      id: 'gohobi',
      name: 'ごほうびブレンド',
      description: 'ごほうびブレンド説明',
      shopId: 'saredo',
      imageUrl: '/images/coffee_bean_sample.jpg',
    };
    res.json(coffeeBean);
  })
  .get('/shops', (req: express.Request, res: express.Response) => {
    const shops: IShop[] = [
      {
        id: 'saredo',
        name: 'Saredo Coffee',
        imageUrl: '/images/shop_sample.webp',
      },
    ];
    res.json(shops);
  })
  .get('/shops/:id', (req: express.Request, res: express.Response) => {
    const shop: IShop = {
      id: 'saredo',
      name: 'Saredo Coffee',
      imageUrl: '/images/shop_sample.webp',
    };
    res.json(shop);
  })
  .get('/plans', (req: express.Request, res: express.Response) => {
    const plans: IPlan[] = [
      {
        id: 'light',
        name: 'ライト',
        price: 1780,
        numberOfShipping: 2,
        numberOfPack: 1,
        amountOfPack: 100,
      },
      {
        id: 'standard',
        name: 'スタンダード',
        price: 2580,
        numberOfShipping: 2,
        numberOfPack: 2,
        amountOfPack: 100,
      },
      {
        id: 'heavy',
        name: 'ヘビー',
        price: 3380,
        numberOfShipping: 2,
        numberOfPack: 4,
        amountOfPack: 100,
      },
    ];
    res.json(plans);
  });

app.use(web).use('/api', api);

// Server
const APP_SERVER_PORT: number = Number(process.env.PORT || '3030');
app.listen(APP_SERVER_PORT, () => {
  // tslint:disable-next-line:no-console
  console.log(`Start app at ${new Date().toString()}.`);
  // tslint:disable-next-line:no-console
  console.log(`Open the site at http://localhost:${APP_SERVER_PORT}`);
});
