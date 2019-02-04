import * as React from 'react';

import { SignForm } from 'presentations/components/SignForm';
import { firebaseAuth } from 'presentations/utils/firebaseAuth';

interface IState {
  email: string;
  password: string;
}

export class SignInFormContainer extends React.Component<{}, IState> {
  constructor(props: {}) {
    super(props);

    this.state = {
      email: 'test@sample.com',
      password: 'password',
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  public render(): JSX.Element {
    return (
      <SignForm
        email={this.state.email}
        password={this.state.password}
        onChange={this.onChange}
        onSubmit={this.onSubmit}
        label="Sign In"
      />
    );
  }

  private onChange(event: React.FormEvent<HTMLInputElement>): void {
    const name: string = event.currentTarget.name;
    const value: string = event.currentTarget.value;

    // tslint:disable-next-line:no-any
    this.setState({ [name]: value } as any);
  }

  private onSubmit(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault();

    const email: string = this.state.email;
    const password: string = this.state.password;
    firebaseAuth
      .signInWithEmailAndPassword(email, password)
      .then((credential: firebase.auth.UserCredential) => {
        return credential.user.getIdToken().then((idToken: string) => {
          return firebaseAuth.setSession(idToken);
        });
      })
      .then(() => {
        return window.location.assign('/private');
      });
  }
}
