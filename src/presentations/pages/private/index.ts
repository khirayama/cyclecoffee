// tslint:disable:no-any
import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { SampleComponent } from 'presentations/components/SampleComponent';
import { IAction, IState } from 'presentations/pages/home/interfaces';
import { reducer } from 'presentations/pages/home/reducer';
import { firebaseApp } from 'presentations/utils/firebaseApp';
import { firebaseAuth } from 'presentations/utils/firebaseAuth';
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

firebaseApp.init();
firebaseAuth.init();
firebaseApp.onAuthStateChanged(async (user: firebase.User) => {
  const idToken: string = await user.getIdToken();
  firebaseAuth.setSession(idToken);
});

window.addEventListener('DOMContentLoaded', () => {
  const el: HTMLElement = window.document.querySelector('.application');
  ReactDOM.render(React.createElement(Provider, { store }, React.createElement(SampleComponent)), el);
});
