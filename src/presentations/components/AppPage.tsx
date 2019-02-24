// tslint:disable:react-a11y-anchors react-no-dangerous-html
import * as React from 'react';

import { ICoffeeBean, IPlan, IShop } from 'interfaces';
import { Footer } from 'presentations/components/Footer';
import { Header } from 'presentations/components/Header';

export interface IProps {
  isSignedIn: boolean;
  plans: IPlan[];
  coffeeBeans: ICoffeeBean[];
  shops: IShop[];
}

// tslint:disable-next-line: completed-docs
export class AppPage extends React.Component<IProps> {
  // tslint:disable:max-func-body-length
  public render(): JSX.Element {
    const plans: IPlan[] = this.props.plans;
    const coffeeBeans: ICoffeeBean[] = this.props.coffeeBeans;
    const shops: IShop[] = this.props.shops;

    return (
      <div className="AppPage">
        <Header isSignedIn={this.props.isSignedIn} />
        <div>App Page</div>
        <Footer />
      </div>
    );
  }
}
