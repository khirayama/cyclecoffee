import * as React from 'react';

import { ICoffeeBean, IPlan, IShop } from 'interfaces';
import { CoffeeBeanCard } from 'presentations/components/CoffeeBeanCard';
import { ShopCard } from 'presentations/components/ShopCard';

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
    const shops: IShop[] = this.props.shops;
    const isSkipped: boolean = this.props.isSkipped;
    const selectedCoffeeBeanIds: string[] = this.props.selectedCoffeeBeanIds;

    return (
      <div className="AppPage">
        <div className="AppPage--Content">
          <div className="AppPage--Heading">次回お届け予定のコーヒー豆</div>
          <div className="AppPage--Content--Deadline">
            <span>
              <i className="Icon">access_time</i>
              3月10日 12:00 まで
            </span>
          </div>
          <ul className="AppPage--Content--CoffeeBeanList">
            {coffeeBeans.map((coffeeBean: ICoffeeBean) => {
              return (
                <li key={coffeeBean.id} className="AppPage--Content--CoffeeBeanList--Item">
                  <div>
                    <CoffeeBeanCard coffeeBean={coffeeBean} />
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
