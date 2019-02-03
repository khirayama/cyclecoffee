import * as express from 'express';
import * as React from 'react';
import { renderToString } from 'react-dom/server';

import { TmpHomePage } from 'presentations/components/TmpHomePage';
import { IAction, IState } from 'presentations/pages/home/interfaces';
import { reducer } from 'presentations/pages/home/reducer';
import { generateLayoutProps, ILayoutProps } from 'presentations/utils/generateLayoutProps';
import { Provider } from 'utils/Container';
import { Store } from 'utils/Store';

export function homeHandler(req: express.Request, res: express.Response): void {
  const initialState: IState = {
    count: 0,
  };
  const store: Store<IState, IAction> = new Store(initialState, reducer);

  const props: ILayoutProps = generateLayoutProps();
  props.path = req.originalUrl;
  props.title = 'Title';
  props.description = 'Description';
  props.keywords = ['coffee', 'コーヒー', '珈琲', 'カフェ', 'cafe', 'うち'];
  props.image = 'TODO';
  props.scripts = ['/pages/home/bundle.js'];
  props.stylesheets = ['/pages/home/index.css'];
  props.children = renderToString(React.createElement(Provider, { store }, React.createElement(TmpHomePage)));

  res.send(req.compiledFunction({ props }));
}
