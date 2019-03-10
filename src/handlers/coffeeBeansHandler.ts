import * as express from 'express';
import * as React from 'react';
import { renderToString } from 'react-dom/server';

import { IAction, ICoffeeBean } from 'interfaces';
import { CoffeeBeansPage, IProps as ICoffeeBeansPageProps } from 'presentations/components/CoffeeBeansPage';
import { generateLayoutProps, ILayoutProps } from 'presentations/utils/generateLayoutProps';
import { CoffeeBean } from 'services/CoffeeBean';
import { Provider } from 'utils/Container';
import { Store } from 'utils/Store';
import { reducer } from 'presentations/pages/coffee-beans/index/reducer';
import { IState } from 'presentations/pages/coffee-beans/index/interfaces';

export function coffeeBeansHandler(req: express.Request, res: express.Response): void {
  CoffeeBean.fetch().then((coffeeBeans: ICoffeeBean[]) => {
    const state: ICoffeeBeansPageProps = {
      coffeeBeans,
    };
    const store: Store<IState, IAction> = new Store(state, reducer);
    const props: ILayoutProps = generateLayoutProps();
    props.path = req.originalUrl;
    props.route = req.route.path;
    props.title = 'cycle coffee | コーヒー定期便 | ポストで受け取り、ゆったりおウチで';
    props.description = '月に2回、自信を持ってお勧めできるコーヒー豆をお届けします。';
    props.keywords = ['coffee', 'コーヒー', '珈琲', 'カフェ', 'cafe', 'うち', '定期便', 'サブスクリプション'].join(',');
    props.image = 'TODO';
    props.scripts = ['/pages/coffee-beans/index/bundle.js'];
    props.stylesheets = ['/pages/coffee-beans/index/index.css'];
    props.children = renderToString(
      React.createElement(Provider, { store }, React.createElement(CoffeeBeansPage, state)),
    );
    props.state = state;

    res.send(req.compiledFunction({ props }));
  });
}
