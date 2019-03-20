import * as React from 'react';

import { ICoffeeBean, IPlan, IShop } from 'interfaces';
import { CoffeeBeanCard } from 'presentations/components/CoffeeBeanCard';
import { Navigation } from 'presentations/components/Navigation';
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
    // const isSkipped: boolean = this.props.isSkipped;
    // const selectedCoffeeBeanIds: string[] = this.props.selectedCoffeeBeanIds;

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
                  <CoffeeBeanCard coffeeBean={coffeeBean} />
                </li>
              );
            })}
          </ul>
          <div className="AppPage--Content--Shop">
            <ShopCard shop={shops[0]} />
          </div>
          <div className="AppPage--Content--Link">
            <a href="/coffee-beans">全てのコーヒー豆から探す</a>
          </div>
          <div className="AppPage--Content--Skip">
            <div className="AppPage--Content--Skip--Label">スキップ</div>
            <div className="AppPage--Content--Skip--Checkbox">
              <input type="checkbox" />
            </div>
            <p className="AppPage--Content--Skip--Attention">
              締切日時時点でONの場合、次回配送をスキップします。返金は行われなわれず、クーポンを配布いたしますので、ご注意ください。
            </p>
          </div>
        </div>
        <Navigation pathname="/" />
      </div>
    );
  }
}
