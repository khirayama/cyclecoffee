import * as React from 'react';

export class Header extends React.Component<{}, {}> {
  public render(): JSX.Element {
    return (
      <header className="Header">
        <div className="Header--Content">
          <h1 className="Header--Content--Heading">
            <a href="/">cycle coffee</a>
          </h1>
          <div className="Header--Content--SignIn">
            <a href="/signin" className="Header--Content--SignIn--Link">
              サインイン
            </a>
          </div>
          <div className="Header--Content--SignUp">
            <a href="/signup" className="Header--Content--SignUp--Link">
              サインアップ
            </a>
          </div>
        </div>
      </header>
    );
  }
}
