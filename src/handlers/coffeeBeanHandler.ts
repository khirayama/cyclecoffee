import * as express from 'express';
import * as React from 'react';
import { renderToString } from 'react-dom/server';

import { CoffeeBeanPage } from 'presentations/components/CoffeeBeanPage';
import { generateLayoutProps, ILayoutProps } from 'presentations/utils/generateLayoutProps';

export function coffeeBeanHandler(req: express.Request, res: express.Response): void {
  const props: ILayoutProps = generateLayoutProps();
  props.path = req.originalUrl;
  props.title = 'cycle coffee | コーヒー定期便 | ポストで受け取り、ゆったりおウチで';
  props.description = '月に2回、自信を持ってお勧めできるコーヒー豆をお届けします。';
  props.keywords = ['coffee', 'コーヒー', '珈琲', 'カフェ', 'cafe', 'うち', '定期便', 'サブスクリプション'].join(',');
  props.image = 'TODO';
  props.scripts = ['/pages/coffee-beans/show/bundle.js'];
  props.stylesheets = ['/pages/coffee-beans/show/index.css'];
  props.children = renderToString(React.createElement(CoffeeBeanPage));

  res.send(req.compiledFunction({ props }));
}
