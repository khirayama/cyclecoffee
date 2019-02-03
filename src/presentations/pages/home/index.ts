// tslint:disable:no-any
import * as firebase from 'firebase/app';
import 'firebase/auth'; // tslint:disable-line:no-import-side-effect
import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { TmpHomePage } from 'presentations/components/TmpHomePage';
import { IAction, IState } from 'presentations/pages/home/interfaces';
import { reducer } from 'presentations/pages/home/reducer';
import { Provider } from 'utils/Container';
import { Store } from 'utils/Store';

declare global {
  // tslint:disable-next-line:interface-name
  interface Window {
    // tslint:disable-next-line:no-any
    state: any;
  }
}

const initialState: IState = {
  ...window.state,
};

const store: Store<IState, IAction> = new Store(initialState, reducer);

const FIREBASE_PROJECT_ID: string = process.env.FIREBASE_PROJECT_ID;
const FIREBASE_API_KEY: string = process.env.FIREBASE_API_KEY;

const firebaseConfig: {
  apiKey: string;
  authDomain: string;
  databaseURL: string;
} = {
  apiKey: FIREBASE_API_KEY,
  authDomain: `${FIREBASE_PROJECT_ID}.firebaseapp.com`,
  databaseURL: `https://${FIREBASE_PROJECT_ID}.firebaseio.com`,
};
firebase.initializeApp(firebaseConfig);

window.addEventListener('DOMContentLoaded', () => {
  const el: HTMLElement = window.document.querySelector('.application');
  ReactDOM.render(React.createElement(Provider, { store }, React.createElement(TmpHomePage)), el);
});
