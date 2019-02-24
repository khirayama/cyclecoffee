import * as express from 'express';
import * as React from 'react';
import { renderToString } from 'react-dom/server';

import { ICoffeeBean, IPlan, IShop } from 'interfaces';
import { AppPage, IProps as IHomePageProps } from 'presentations/components/AppPage';
import { generateLayoutProps, ILayoutProps } from 'presentations/utils/generateLayoutProps';
import { CoffeeBean } from 'services/CoffeeBean';
import { Plan } from 'services/Plan';
import { Shop } from 'services/Shop';

export function appHandler(req: express.Request, res: express.Response): void {
  Promise.all([Shop.fetch(), CoffeeBean.fetch(), Plan.fetch()]).then((result: [IShop[], ICoffeeBean[], IPlan[]]) => {
    const shops: IShop[] = result[0];
    const coffeeBeans: ICoffeeBean[] = result[1];
    const plans: IPlan[] = result[2];
    const state: IHomePageProps = {
      isSignedIn: req.isSignedIn,
      shops,
      coffeeBeans,
      plans,
    };

    const props: ILayoutProps = generateLayoutProps();
    props.path = req.originalUrl;
    props.route = req.route.path;
    props.title = 'cycle coffee | コーヒー定期便 | ポストで受け取り、ゆったりおウチで';
    props.description = '月に2回、自信を持ってお勧めできるコーヒー豆をお届けします。';
    props.keywords = ['coffee', 'コーヒー', '珈琲', 'カフェ', 'cafe', 'うち', '定期便', 'サブスクリプション'].join(',');
    props.image = 'TODO';
    props.scripts = ['/pages/app/bundle.js'];
    props.stylesheets = ['/pages/app/index.css'];
    props.children = renderToString(React.createElement(AppPage, state));
    props.state = state;

    res.send(req.compiledFunction({ props }));
  });
}
