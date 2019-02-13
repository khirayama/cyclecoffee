import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { CoffeeBeanPage } from 'presentations/components/CoffeeBeanPage';

window.addEventListener('DOMContentLoaded', () => {
  const el: HTMLElement = window.document.querySelector('.application');
  ReactDOM.render(React.createElement(CoffeeBeanPage, window.state), el);
});
