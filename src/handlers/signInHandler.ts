import * as express from 'express';
import * as React from 'react';
import { renderToString } from 'react-dom/server';

import { SignInPage } from 'presentations/components/SignInPage';
import { generateLayoutProps, ILayoutProps } from 'presentations/utils/generateLayoutProps';

export function signInHandler(req: express.Request, res: express.Response): void {
  const props: ILayoutProps = generateLayoutProps();
  props.path = req.originalUrl;
  props.title = 'Title';
  props.description = 'Description';
  props.keywords = ['coffee', 'コーヒー', '珈琲', 'カフェ', 'cafe', 'うち'];
  props.image = 'TODO';
  props.scripts = ['/pages/signin/bundle.js'];
  props.stylesheets = ['/pages/signin/index.css'];
  props.children = renderToString(React.createElement(SignInPage));

  res.send(req.compiledFunction({ props }));
}
