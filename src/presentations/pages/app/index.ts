import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { IAction } from 'interfaces';
import { AppPage } from 'presentations/components/AppPage';
import { Provider } from 'utils/Container';
import { Store } from 'utils/Store';
import { reducer } from 'presentations/pages/app/reducer';
import { IState } from 'presentations/pages/app/interfaces';

const store: Store<IState, IAction> = new Store(window.state, reducer);

window.addEventListener('DOMContentLoaded', () => {
  const el: HTMLElement = window.document.querySelector('.application');
  ReactDOM.render(React.createElement(Provider, { store }, React.createElement(AppPage, window.state)), el);
});
