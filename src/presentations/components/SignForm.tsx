import * as React from 'react';

import { firebaseAuth } from 'presentations/utils/firebaseAuth';

interface IProps {
  email: string;
  password: string;
  label: string;
  onChange: SignForm['onChange'];
  onSubmit: SignForm['onSubmit'];
}

export class SignForm extends React.Component<IProps, {}> {
  constructor(props: IProps) {
    super(props);

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  public render(): JSX.Element {
    return (
      <form onSubmit={this.onSubmit}>
        <input type="text" name="email" value={this.props.email} onChange={this.onChange} />
        <input type="password" name="password" value={this.props.password} onChange={this.onChange} />
        <button>{this.props.label}</button>
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
