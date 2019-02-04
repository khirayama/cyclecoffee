import * as express from 'express';
import * as firebaseAdmin from 'firebase-admin';
import * as React from 'react';
import { renderToString } from 'react-dom/server';

import { SampleComponent } from 'presentations/components/SampleComponent';
import { generateLayoutProps, ILayoutProps } from 'presentations/utils/generateLayoutProps';

interface IState {
}

function initializeState(): Promise<IState> {
  const initialState: IState = {
  };

  // tslint:disable-next-line:no-any
  return new Promise((resolve: any) => {
    resolve(initialState);
  });
}

export function privateHandler(req: express.Request, res: express.Response): void {

  const props: ILayoutProps = generateLayoutProps();
  props.path = req.originalUrl;
  props.title = 'Title';
  props.description = 'Description';
  props.keywords = ['coffee', 'コーヒー', '珈琲', 'カフェ', 'cafe', 'うち'];
  props.image = 'TODO';
  props.scripts = ['/pages/private/bundle.js'];
  props.stylesheets = ['/pages/private/index.css'];
  props.children = renderToString(React.createElement(SampleComponent));

  const db: firebaseAdmin.firestore.Firestore = firebaseAdmin.firestore();
  db.collection('users')
    .doc(req.uid)
    .get()
    .then((result: firebaseAdmin.firestore.DocumentSnapshot) => {
      console.log(result.data());
    });

  res.send(req.compiledFunction({ props }));
}
