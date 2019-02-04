import * as React from 'react';

export class HomePage extends React.Component<{}, {}> {
  public render(): JSX.Element {
    return (
      <div>
        <h1>cycle coffee</h1>
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
