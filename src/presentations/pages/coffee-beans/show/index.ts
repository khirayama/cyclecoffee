import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { CoffeeBeanShowPage } from 'presentations/components/CoffeeBeanShowPage';

window.addEventListener('DOMContentLoaded', () => {
  const el: HTMLElement = window.document.querySelector('.application');
  ReactDOM.render(React.createElement(CoffeeBeanShowPage), el);
});
