import * as React from 'react';

import { ICoffeeBean, IShop } from 'interfaces';
import { CoffeeBeanCard } from 'presentations/components/CoffeeBeanCard';
import { Navigation } from 'presentations/components/Navigation';

export interface IProps {
  isSignedIn: boolean;
  shop: IShop;
  coffeeBeans: ICoffeeBean[];
}

export class ShopPage extends React.Component<IProps> {
  public render(): JSX.Element {
    const shop: IShop = this.props.shop;
    const coffeeBeans: ICoffeeBean[] = this.props.coffeeBeans;

    return (
      <div className="ShopPage">
        <div className="ShopPage--Content">
          <div className="ShopPage--Content--ShopImage">
            <img src={shop.imageUrl} alt={shop.name} />
          </div>
          <div className="ShopPage--Content--CoffeeBean">
            <h1>{shop.name}</h1>
            <p>TODO: 写真替え、説明、地図、そのほか情報</p>
            <ul className="ShopPage--Content--CoffeeBeanList">
              {coffeeBeans.map((coffeeBean: ICoffeeBean) => {
                return (
                  <li key={coffeeBean.id} className="ShopPage--Content--CoffeeBeanList--Item">
                    <CoffeeBeanCard coffeeBean={coffeeBean} />
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        <Navigation pathname="/" />
      </div>
    );
  }
}
