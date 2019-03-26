import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { IAction, IState } from 'interfaces';
import { CoffeeBeanPage } from 'presentations/components/CoffeeBeanPage';
import { Provider } from 'utils/Container';
import { Store } from 'utils/Store';
import { reducer } from 'reducers';

const store: Store<IState, IAction> = new Store(window.state, reducer);

window.addEventListener('DOMContentLoaded', () => {
  const el: HTMLElement = window.document.querySelector('.application');
  ReactDOM.render(React.createElement(Provider, { store }, React.createElement(CoffeeBeanPage, window.state)), el);
});
