// tslint:disable:react-a11y-anchors
import * as React from 'react';

import { dic } from 'dic';

export class HomePage extends React.Component<{}, {}> {
  public render(): JSX.Element {
    return (
      <div className="HomePage">
        <header className="HomePage--Header">
          <div className="HomePage--Header--Content">
            <h1 className="HomePage--Header--Content--Heading">{dic.t('name')}</h1>
            <nav className="HomePage--Header--Content--Navigation">
              <ul className="HomePage--Header--Content--Navigation--List">
                <li className="HomePage--Header--Content--Navigation--List--Item">
                  <a href="/services">{dic.t('components.HomePage.Header.Content.Navigation.service')}</a>
                </li>
                <li className="HomePage--Header--Content--Navigation--List--Item">
                  <a href="/coffee-beans">{dic.t('components.HomePage.Header.Content.Navigation.coffee_beans')}</a>
                </li>
                <li className="HomePage--Header--Content--Navigation--List--Item">
                  <a href="/shops">{dic.t('components.HomePage.Header.Content.Navigation.shops')}</a>
                </li>
              </ul>
            </nav>
            <div className="HomePage--Header--Content--SignIn">
              <a href="/signin" className="HomePage--Header--Content--SignIn--Link">
                {dic.t('components.HomePage.Header.Content.signin')}
              </a>
            </div>
          </div>
        </header>
        <div className="HomePage--MainVisual" />
      </div>
    );
  }
}
