import * as React from 'react';

import { Footer } from 'presentations/components/Footer';
import { Header } from 'presentations/components/Header';

export type Props = {};

export class SignInPage extends React.Component<Props> {
  public render(): JSX.Element {
    return (
      <div className="SignInPage">
        <Header isSignedIn={false} />
        <div>SignIn</div>
        <Footer />
      </div>
    );
  }
}
