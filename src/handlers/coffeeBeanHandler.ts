import axios, { AxiosInstance, AxiosResponse } from 'axios';
import * as express from 'express';
import * as React from 'react';
import { renderToString } from 'react-dom/server';

import { ICoffeeBean, IShop } from 'interfaces';
import { CoffeeBeanPage, IProps as ICoffeeBeanPageProps } from 'presentations/components/CoffeeBeanPage';
import { generateLayoutProps, ILayoutProps } from 'presentations/utils/generateLayoutProps';

export const request: AxiosInstance = axios.create({
  baseURL: 'http://localhost:3030/',
});

export function coffeeBeanHandler(req: express.Request, res: express.Response): void {
  Promise.all([request.get('/api/shops/saredo'), request.get('/api/coffee-beans/gohobi')]).then(
    (result: AxiosResponse[]) => {
      const shop: IShop = result[0].data;
      const coffeeBean: ICoffeeBean = result[1].data;

      const state: ICoffeeBeanPageProps = {
        shop,
        coffeeBean,
      };

      const props: ILayoutProps = generateLayoutProps();
      props.path = req.originalUrl;
      props.title = 'cycle coffee | コーヒー定期便 | ポストで受け取り、ゆったりおウチで';
      props.description = '月に2回、自信を持ってお勧めできるコーヒー豆をお届けします。';
      props.keywords = ['coffee', 'コーヒー', '珈琲', 'カフェ', 'cafe', 'うち', '定期便', 'サブスクリプション'].join(
        ',',
      );
      props.image = 'TODO';
      props.scripts = ['/pages/coffee-beans/show/bundle.js'];
      props.stylesheets = ['/pages/coffee-beans/show/index.css'];
      props.children = renderToString(React.createElement(CoffeeBeanPage, state));
      props.state = state;

      res.send(req.compiledFunction({ props }));
    },
  );
}
