// tslint:disable:react-a11y-anchors react-no-dangerous-html
import * as React from 'react';

import { ICoffeeBean, IShop } from 'interfaces';
import { Footer } from 'presentations/components/Footer';
import { Header } from 'presentations/components/Header';

export interface IProps {
  shop: IShop;
  coffeeBean: ICoffeeBean;
}

export class CoffeeBeanPage extends React.Component<IProps, {}> {
  // tslint:disable:max-func-body-length
  public render(): JSX.Element {
    const shop: IShop = this.props.shop;
    const coffeeBean: ICoffeeBean = this.props.coffeeBean;

    return (
      <div className="CoffeeBeanPage">
        <Header />
        <div className="CoffeeBeanPage--CoffeeBean">
          <h1>{coffeeBean.name}</h1>
          <img src={coffeeBean.imageUrl} alt={coffeeBean.name} />
          <h2 className="CoffeeBeanPage--CoffeeBean--ShopName">
            <a href={`/shops/${shop.id}`}>
              <img src={shop.imageUrl} alt={shop.name} />
              <span>{shop.name}</span>
            </a>
          </h2>
          <div className="CoffeeBeanPage--CoffeeBean--SelectButton">
            <button>注文豆に選択</button>
          </div>
          <h3>生豆情報</h3>
          <table>
            <tbody>
              <tr>
                <td>名前</td>
                <td>{coffeeBean.greenCoffeeBean.name}</td>
              </tr>
              <tr>
                <td>地域</td>
                <td>{coffeeBean.greenCoffeeBean.country}</td>
              </tr>
              <tr>
                <td>産地標高</td>
                <td>{coffeeBean.greenCoffeeBean.height}m</td>
              </tr>
              <tr>
                <td>精製所</td>
                <td>{coffeeBean.greenCoffeeBean.farm}</td>
              </tr>
              <tr>
                <td>品種</td>
                <td>{coffeeBean.greenCoffeeBean.breed}</td>
              </tr>
              <tr>
                <td>精製法</td>
                <td>{coffeeBean.greenCoffeeBean.process}</td>
              </tr>
            </tbody>
          </table>
          <h3>焙煎プロファイル</h3>
          <img src="/images/roast_profile.png" alt={`${shop.name}の${coffeeBean.name}の焙煎プロファイル`} />
          <p>
            <span>{coffeeBean.roastProfile.roast}</span>
            <span>{coffeeBean.roastProfile.machine}</span>
            <span>{coffeeBean.roastProfile.season}</span>
          </p>
        </div>
        <Footer />
      </div>
    );
  }
}
