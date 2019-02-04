import * as React from 'react';

import { firebaseAuth } from 'presentations/utils/firebaseAuth';

interface IState {
  email: string;
  password: string;
}

export class TmpHomePage extends React.Component<{}, IState> {
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
      <form onSubmit={this.onSubmit}>
        <input type="text" name="email" value={this.state.email} onChange={this.onChange} />
        <input type="password" name="password" value={this.state.password} onChange={this.onChange} />
        <button>Log in</button>
      </form>
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
      .createUserWithEmailAndPassword(email, password)
      .then((credential: firebase.auth.UserCredential) => {
        return credential.user.getIdToken().then((idToken: string) => {
          return firebaseAuth.setSession(idToken);
        });
      })
      .then(() => {
        return window.location.assign('/private');
      })
      .catch((signUpError: firebase.auth.Error) => {
        if (signUpError.code === 'auth/email-already-in-use') {
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
      });
  }
}
