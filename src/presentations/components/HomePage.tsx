// tslint:disable:react-no-dangerous-html
import * as React from 'react';

import { dic } from 'dic';

export class HomePage extends React.Component<{}, {}> {
  public render(): JSX.Element {
    return (
      <div className="HomePage">
        <header className="HomePage--Header">
          <div className="HomePage--Header--Content">
            <p dangerouslySetInnerHTML={{ __html: dic.t('components.HomePage.description') }} />
            <h1>{dic.t('name')}</h1>
          </div>
        </header>
        <p>
          <a href="/signup">Sign Up</a>
        </p>
        <p>
          <a href="/signin">Sign In</a>
        </p>
      </div>
    );
  }
}
