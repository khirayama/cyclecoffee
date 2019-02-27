// tslint:disable:react-a11y-anchors react-no-dangerous-html
import * as React from 'react';

import { ICoffeeBean, IPlan, IShop } from 'interfaces';
import { CoffeeBeanCard } from 'presentations/components/CoffeeBeanCard';
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
        <div className="AppPage--Content">
          <div>最初のコーヒー豆を選ぼう</div>
          <ul className="AppPage--Content--CoffeeBeanList">
            {coffeeBeans.map((coffeeBean: ICoffeeBean) => {
              return (
                <li key={coffeeBean.id} className="AppPage--Content--CoffeeBeanList--Item">
                  <CoffeeBeanCard coffeeBean={coffeeBean} />
                </li>
              );
            })}
          </ul>
          <div>次回のコーヒー豆</div>
          <div>ロースター紹介</div>
          <div>スキップ</div>
          <div />
        </div>
        <Footer />
      </div>
    );
  }
}
