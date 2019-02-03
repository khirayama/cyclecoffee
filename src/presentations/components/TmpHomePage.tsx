import * as firebase from 'firebase/app';
// tslint:disable-next-line:no-import-side-effect
import 'firebase/auth';
import * as React from 'react';

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

    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.NONE);
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
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      // tslint:disable-next-line:no-any
      .then((user: any) => {
        return user.getIdToken().then((idToken: string) => {
          window.document.cookie = `idToken=${idToken};`;
          window.location.href = '/private';
        });
      })
      // tslint:disable-next-line:no-any
      .catch((signupError: any) => {
        if (signupError.code === 'auth/email-already-in-use') {
          firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            // tslint:disable-next-line:no-any
            .then((user: any) => {
              return user.getIdToken().then((idToken: string) => {
                window.document.cookie = `idToken=${idToken};`;
                window.location.href = '/private';
              });
            });
        }
      });
  }
}
