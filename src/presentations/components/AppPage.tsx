import * as React from 'react';

import { ICoffeeBean, IPlan, IShop } from 'interfaces';
import { CoffeeBeanCard } from 'presentations/components/CoffeeBeanCard';
import { ShopCard } from 'presentations/components/ShopCard';
import { CoffeeBeanSelectButtonContainer } from 'presentations/containers/CoffeeBeanSelectButtonContainer';

export interface IProps {
  isSignedIn: boolean;
  plans: IPlan[];
  coffeeBeans: ICoffeeBean[];
  shops: IShop[];
  isSkipped: boolean;
  selectedCoffeeBeanIds: string[];
}

export class AppPage extends React.Component<IProps> {
  public render(): JSX.Element {
    const coffeeBeans: ICoffeeBean[] = this.props.coffeeBeans;
    const plans: IPlan[] = this.props.plans;
    const shops: IShop[] = this.props.shops;
    const isSkipped: boolean = this.props.isSkipped;
    const selectedCoffeeBeanIds: string[] = this.props.selectedCoffeeBeanIds;

    return (
      <div className="AppPage">
        <div className="AppPage--Content">
          <div>次回お届け予定のコーヒー豆</div>
          <ul className="AppPage--Content--CoffeeBeanList">
            {coffeeBeans.map((coffeeBean: ICoffeeBean) => {
              return (
                <li key={coffeeBean.id} className="AppPage--Content--CoffeeBeanList--Item">
                  <div>
                    <CoffeeBeanCard coffeeBean={coffeeBean} />
                    <CoffeeBeanSelectButtonContainer />
                  </div>
                </li>
              );
            })}
          </ul>
          <small>生産状況により代理豆をお届けする場合があります。ご了承ください。</small>
          <ShopCard shop={shops[0]} />
          <div>スキップ</div>
          <input type="checkbox" checked={isSkipped} onChange={() => console.log('change')} />
          <div />
        </div>
      </div>
    );
  }
}
