// tslint:disable:react-a11y-anchors react-no-dangerous-html
import * as React from 'react';

import { ICoffeeBean, IShop } from 'interfaces';
import { Footer } from 'presentations/components/Footer';
import { Header } from 'presentations/components/Header';

export class ShopPage extends React.Component<{}, {}> {
  // tslint:disable:max-func-body-length
  public render(): JSX.Element {
    const shop: IShop = {
      id: 'saredo',
      name: 'Saredo Coffee',
      imageUrl: '/images/shop_sample.webp',
    };

    const coffeeBean: ICoffeeBean = {
      id: 'gohobi',
      name: 'ごほうびブレンド',
      description: 'ごほうびブレンド説明',
      shopId: 'saredo',
      imageUrl: '/images/coffee_bean_sample.jpg',
    };

    return (
      <div className="ShopPage">
        <Header />
        <div className="ShopPage--CoffeeBean">
          <h1>{coffeeBean.name}</h1>
          <img src={coffeeBean.imageUrl} alt={coffeeBean.name} />
          <h2 className="ShopPage--CoffeeBean--ShopName">
            <a href={`/shops/${shop.id}`}>
              <img src={shop.imageUrl} alt={shop.name} />
              <span>{shop.name}</span>
            </a>
          </h2>
          <div className="ShopPage--CoffeeBean--SelectButton">
            <button>注文豆に選択</button>
          </div>
          <h3>生豆情報</h3>
          <table>
            <tbody>
              <tr>
                <td>名前</td>
                <td>ブラジル</td>
              </tr>
              <tr>
                <td>地域</td>
                <td>ブラジル</td>
              </tr>
              <tr>
                <td>産地標高</td>
                <td>1805m</td>
              </tr>
              <tr>
                <td>精製所</td>
                <td>ホゲホゲ農園</td>
              </tr>
              <tr>
                <td>品種</td>
                <td>ブルボン</td>
              </tr>
              <tr>
                <td>精製法</td>
                <td>フーリーウォッシュド</td>
              </tr>
            </tbody>
          </table>
          <h3>焙煎プロファイル</h3>
          <img src="/images/roast_profile.png" alt={`${shop.name}の${coffeeBean.name}の焙煎プロファイル`} />
          <p>スマートロースター 熱風式70kg釜 プロパンガス</p>
          <p>2019年2月12日</p>
          <p>中煎り</p>
        </div>
        <Footer />
      </div>
    );
  }
}
