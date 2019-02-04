import * as firebase from 'firebase/app';
import 'firebase/firestore'; // tslint:disable-line:no-import-side-effect
import * as React from 'react';

interface IUserFormProps {
  name: string;
  birthday: string;
  email: string;
  tel: string;
  zipCode: string;
  address: string;
  onChange: UserForm['onChange'];
  onSubmit: UserForm['onSubmit'];
}

class UserForm extends React.Component<IUserFormProps, {}> {
  constructor(props: IUserFormProps) {
    super(props);

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  public render(): JSX.Element {
    return (
      <form onSubmit={this.onSubmit}>
        <input type="text" name="name" placeholder="名前" value={this.props.name} onChange={this.onChange} />
        <input
          type="date"
          name="birthday"
          placeholder="生年月日"
          value={this.props.birthday}
          onChange={this.onChange}
        />
        <input
          type="text"
          name="email"
          placeholder="メールアドレス"
          value={this.props.email}
          onChange={this.onChange}
        />
        <input type="text" name="tel" placeholder="電話番号" value={this.props.tel} onChange={this.onChange} />
        <input type="text" name="zipCode" placeholder="郵便番号" value={this.props.zipCode} onChange={this.onChange} />
        <input type="text" name="address" placeholder="住所" value={this.props.address} onChange={this.onChange} />
        <button>Submit</button>
      </form>
    );
  }

  private onChange(event: React.FormEvent<HTMLInputElement>): void {
    this.props.onChange(event);
  }

  private onSubmit(event: React.FormEvent<HTMLFormElement>): void {
    this.props.onSubmit(event);
  }
}

interface IUserFormContainerState {
  name: string;
  birthday: string;
  email: string;
  tel: string;
  zipCode: string;
  address: string;
}

class UserFormContainer extends React.Component<{}, IUserFormContainerState> {
  constructor(props: IUserFormProps) {
    super(props);

    this.state = {
      name: '',
      birthday: '',
      email: '',
      tel: '',
      zipCode: '',
      address: '',
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  public render(): JSX.Element {
    return (
      <UserForm
        name={this.state.name}
        birthday={this.state.birthday}
        email={this.state.email}
        tel={this.state.tel}
        zipCode={this.state.zipCode}
        address={this.state.address}
        onChange={this.onChange}
        onSubmit={this.onSubmit}
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
    const db: firebase.firestore.Firestore = firebase.firestore();
    const user: firebase.User = firebase.auth().currentUser;
    db.collection('users')
      .doc(user.uid)
      .set(this.state);
  }
}

export class SampleComponent extends React.Component {
  public render(): JSX.Element {
    return <UserFormContainer />;
  }
}
