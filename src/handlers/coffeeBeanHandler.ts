import * as express from 'express';
import * as React from 'react';
import { renderToString } from 'react-dom/server';

import { IAction, ICoffeeBean, IShop } from 'interfaces';
import { CoffeeBeanPage, IProps as ICoffeeBeanPageProps } from 'presentations/components/CoffeeBeanPage';
import { generateLayoutProps, ILayoutProps } from 'presentations/utils/generateLayoutProps';
import { CoffeeBean } from 'services/CoffeeBean';
import { Shop } from 'services/Shop';
import { Provider } from 'utils/Container';
import { Store } from 'utils/Store';
import { reducer } from 'presentations/pages/coffee-beans/show/reducer';
import { IState } from 'presentations/pages/coffee-beans/show/interfaces';

export function coffeeBeanHandler(req: express.Request, res: express.Response): void {
  CoffeeBean.find(req.params.id).then((coffeeBean: ICoffeeBean) => {
    Shop.find(coffeeBean.shopId).then((shop: IShop) => {
      const state: ICoffeeBeanPageProps = {
        isSignedIn: req.isSignedIn,
        shop,
        coffeeBean,
      };

      const store: Store<IState, IAction> = new Store(state, reducer);
      const props: ILayoutProps = generateLayoutProps();
      props.path = req.originalUrl;
      props.route = req.route.path;
      props.title = 'cycle coffee | コーヒー定期便 | ポストで受け取り、ゆったりおウチで';
      props.description = '月に2回、自信を持ってお勧めできるコーヒー豆をお届けします。';
      props.keywords = ['coffee', 'コーヒー', '珈琲', 'カフェ', 'cafe', 'うち', '定期便', 'サブスクリプション'].join(
        ',',
      );
      props.image = 'TODO';
      props.scripts = ['/pages/coffee-beans/show/bundle.js'];
      props.stylesheets = ['/pages/coffee-beans/show/index.css'];
      props.children = renderToString(
        React.createElement(Provider, { store }, React.createElement(CoffeeBeanPage, state)),
      );
      props.state = state;

      res.send(req.compiledFunction({ props }));
    });
  });
}
