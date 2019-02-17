// tslint:disable:react-a11y-anchors react-no-dangerous-html
import * as React from 'react';

import { ICoffeeBean, IShop } from 'interfaces';
import { CoffeeBeanCard } from 'presentations/components/CoffeeBeanCard';
import { Footer } from 'presentations/components/Footer';
import { Header } from 'presentations/components/Header';

export interface IProps {
  isSignedIn: boolean;
  shop: IShop;
  coffeeBeans: ICoffeeBean[];
}

export class ShopPage extends React.Component<IProps, {}> {
  // tslint:disable:max-func-body-length
  public render(): JSX.Element {
    const shop: IShop = this.props.shop;
    const coffeeBeans: ICoffeeBean[] = this.props.coffeeBeans;

    return (
      <div className="ShopPage">
        <Header isSignedIn={this.props.isSignedIn} />
        <div className="ShopPage--CoffeeBean">
          <h1>{shop.name}</h1>
          <img src={shop.imageUrl} alt={shop.name} />
          <p>TODO: 写真替え、説明、地図、そのほか情報</p>
          <ul className="ShopPage--CoffeeBean--List">
            {coffeeBeans.map((coffeeBean: ICoffeeBean) => {
              return (
                <li key={coffeeBean.id} className="ShopPage--CoffeeBean--List--Item">
                  <CoffeeBeanCard coffeeBean={coffeeBean} />
                </li>
              );
            })}
          </ul>
        </div>
        <Footer />
      </div>
    );
  }
}
