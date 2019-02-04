import * as express from 'express';
import * as firebaseAdmin from 'firebase-admin';
import * as React from 'react';
import { renderToString } from 'react-dom/server';

import { SampleComponent } from 'presentations/components/SampleComponent';
import { IAction, IState } from 'presentations/pages/home/interfaces';
import { reducer } from 'presentations/pages/home/reducer';
import { generateLayoutProps, ILayoutProps } from 'presentations/utils/generateLayoutProps';
import { Provider } from 'utils/Container';
import { Store } from 'utils/Store';

export function authHandler(req: express.Request, res: express.Response, next: express.Next): void {
  const sessionCookie: string = req.cookies.session || '';
  firebaseAdmin
    .auth()
    // TODO: It's too slow. I should make sure that it is ok to set false.
    // .verifySessionCookie(sessionCookie, true)
    .verifySessionCookie(sessionCookie, false)
    .then((decodedClaims: firebaseAdmin.auth.DecodedIdToken) => {
      next();
    })
    .catch((error: Error) => {
      res.redirect('/');
    });
}

export function privateHandler(req: express.Request, res: express.Response): void {
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
  props.scripts = ['/pages/private/bundle.js'];
  props.stylesheets = ['/pages/private/index.css'];
  props.children = renderToString(React.createElement(Provider, { store }, React.createElement(SampleComponent)));

  res.send(req.compiledFunction({ props }));
}
