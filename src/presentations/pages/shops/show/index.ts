import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { ShopPage } from 'presentations/components/ShopPage';

window.addEventListener('DOMContentLoaded', () => {
  const el: HTMLElement = window.document.querySelector('.application');
  ReactDOM.render(React.createElement(ShopPage), el);
});
