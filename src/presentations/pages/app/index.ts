import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { AppPage } from 'presentations/components/AppPage';

window.addEventListener('DOMContentLoaded', () => {
  const el: HTMLElement = window.document.querySelector('.application');
  ReactDOM.render(React.createElement(AppPage, window.state), el);
});
