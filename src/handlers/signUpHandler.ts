import * as express from 'express';
import * as React from 'react';
import { renderToString } from 'react-dom/server';

import { SignUpPage } from 'presentations/components/SignUpPage';
import { generateLayoutProps, ILayoutProps } from 'presentations/utils/generateLayoutProps';

export function signUpHandler(req: express.Request, res: express.Response): void {
  const props: ILayoutProps = generateLayoutProps();
  props.path = req.originalUrl;
  props.title = 'Title';
  props.description = 'Description';
  props.keywords = ['coffee', 'コーヒー', '珈琲', 'カフェ', 'cafe', 'うち'];
  props.image = 'TODO';
  props.scripts = ['/pages/signup/bundle.js'];
  props.stylesheets = ['/pages/signup/index.css'];
  props.children = renderToString(React.createElement(SignUpPage));

  res.send(req.compiledFunction({ props }));
}
