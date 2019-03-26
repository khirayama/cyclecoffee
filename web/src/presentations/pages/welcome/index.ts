import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { WelcomePage } from 'presentations/components/WelcomePage';

window.addEventListener('DOMContentLoaded', () => {
  const el: HTMLElement = window.document.querySelector('.application');
  ReactDOM.render(React.createElement(WelcomePage, window.state), el);
});
