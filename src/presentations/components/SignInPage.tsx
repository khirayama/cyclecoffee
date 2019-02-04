import * as React from 'react';

import { SignInFormContainer } from 'presentations/containers/SignInFormContainer';

export class SignInPage extends React.Component<{}, {}> {
  public render(): JSX.Element {
    return (
      <div>
        <SignInFormContainer />
        <a href="/signup">Sign Up</a>
      </div>
    );
  }
}
