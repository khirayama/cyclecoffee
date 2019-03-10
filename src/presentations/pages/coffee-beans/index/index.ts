import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { IAction } from 'interfaces';
import { CoffeeBeansPage } from 'presentations/components/CoffeeBeansPage';
import { Provider } from 'utils/Container';
import { Store } from 'utils/Store';
import { reducer } from 'presentations/pages/coffee-beans/index/reducer';
import { IState } from 'presentations/pages/coffee-beans/index/interfaces';

const store: Store<IState, IAction> = new Store(window.state, reducer);

window.addEventListener('DOMContentLoaded', () => {
  const el: HTMLElement = window.document.querySelector('.application');
  ReactDOM.render(React.createElement(Provider, { store }, React.createElement(CoffeeBeansPage, window.state)), el);
});
