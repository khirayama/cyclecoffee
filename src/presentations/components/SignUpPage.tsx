import * as React from 'react';

import { SignUpFormContainer } from 'presentations/containers/SignUpFormContainer';

export class SignUpPage extends React.Component<{}, {}> {
  public render(): JSX.Element {
    return (
      <div>
        <SignUpFormContainer />
        <a href="/signin">Sign In</a>
      </div>
    );
  }
}
