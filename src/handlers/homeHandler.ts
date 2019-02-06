import * as express from 'express';
import * as React from 'react';
import { renderToString } from 'react-dom/server';

import { dic } from 'dic';
import { HomePage } from 'presentations/components/HomePage';
import { generateLayoutProps, ILayoutProps } from 'presentations/utils/generateLayoutProps';

export function homeHandler(req: express.Request, res: express.Response): void {
  const props: ILayoutProps = generateLayoutProps();
  props.path = req.originalUrl;
  props.title = dic.t('pages.home.title');
  props.description = dic.t('pages.home.description');
  props.keywords = dic.t('pages.home.keywords');
  props.image = dic.t('pages.home.image');
  props.scripts = ['/pages/home/bundle.js'];
  props.stylesheets = ['/pages/home/index.css'];
  props.children = renderToString(React.createElement(HomePage));

  res.send(req.compiledFunction({ props }));
}
