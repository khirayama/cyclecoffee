// tslint:disable:react-a11y-anchors
import * as React from 'react';

import { dic } from 'dic';

interface IPlan {
  id: string;
  name: string;
  price: number;
  numberOfShipping: number;
  numberOfPack: number;
  amountOfPack: number;
}

interface IShop {
  id: string;
  name: string;
  imageUrl: string;
}

interface ICoffeeBean {
  id: string;
  name: string;
  description: string;
  shopId: string;
  imageUrl: string;
}

export class HomePage extends React.Component<{}, {}> {
  // tslint:disable:max-func-body-length
  public render(): JSX.Element {
    const plans: IPlan[] = [
      {
        id: 'light',
        name: 'ライト',
        price: 1780,
        numberOfShipping: 2,
        numberOfPack: 1,
        amountOfPack: 100,
      },
      {
        id: 'standard',
        name: 'スタンダード',
        price: 2580,
        numberOfShipping: 2,
        numberOfPack: 2,
        amountOfPack: 100,
      },
      {
        id: 'heavy',
        name: 'ヘビー',
        price: 3380,
        numberOfShipping: 2,
        numberOfPack: 4,
        amountOfPack: 100,
      },
    ];

    const shops: IShop[] = [
      {
        id: 'saredo',
        name: 'Saredo Coffee',
        imageUrl: '/images/shop_sample.webp',
      },
    ];

    const coffeeBeans: ICoffeeBean[] = [
      {
        id: 'gohobi',
        name: 'ごほうびブレンド',
        description: 'ごほうびブレンド説明',
        shopId: 'saredo',
        imageUrl: '/images/coffee_bean_sample.jpg',
      },
      {
        id: 'horoniga',
        name: 'ほろにがブレンド',
        description: 'ほろにがブレンド説明',
        shopId: 'saredo',
        imageUrl: '/images/coffee_bean_sample.jpg',
      },
    ];

    return (
      <div className="HomePage">
        <header className="HomePage--Header">
          <div className="HomePage--Header--Content">
            <h1 className="HomePage--Header--Content--Heading">{dic.t('name')}</h1>
            <div className="HomePage--Header--Content--SignIn">
              <a href="/signin" className="HomePage--Header--Content--SignIn--Link">
                {dic.t('components.HomePage.Header.Content.signin')}
              </a>
            </div>
            <div className="HomePage--Header--Content--SignUp">
              <a href="/signup" className="HomePage--Header--Content--SignUp--Link">
                {dic.t('components.HomePage.Header.Content.signup')}
              </a>
            </div>
          </div>
        </header>
        <h2>
          素敵なコーヒーとの出会いを。
          <br />
          あなたの過ごし方のパートナーに。
          <br />
          コーヒー豆定期便、お届けします。
        </h2>
        <nav className="HomePage--Navigation">
          <ul className="HomePage--Navigation--List">
            <li className="HomePage--Navigation--List--Item">
              <a href="#services">{dic.t('components.HomePage.Navigation.service')}</a>
            </li>
            <li className="HomePage--Navigation--List--Item">
              <a href="#coffee-beans">{dic.t('components.HomePage.Navigation.coffee_beans')}</a>
            </li>
          </ul>
        </nav>
        <h2>cycle coffeeが届くまで</h2>
        <ul>
          <li>ステップ1</li>
          <li>ステップ2</li>
          <li>ステップ3</li>
        </ul>
        <h2>月に2度、新鮮なコーヒー豆をお届けます。お好みの量をお選びください。</h2>
        <div className="HomePage--Plan">
          <ul className="HomePage--Plan--List">
            {plans.map((plan: IPlan) => {
              return (
                <li key={plan.id} className="HomePage--Plan--List--Item">
                  <h2>{plan.name}</h2>
                  <p>{plan.price} 円</p>
                  <p>{plan.numberOfShipping * plan.numberOfPack * plan.amountOfPack} g / 月</p>
                  <p>
                    月 {plan.numberOfShipping} 回、 {plan.amountOfPack * plan.numberOfPack} gずつのお届け。
                  </p>
                </li>
              );
            })}
          </ul>
        </div>
        <h2>コーヒー豆をお選びいただけます</h2>
        <div className="HomePage--CoffeeBeans">
          <ul className="HomePage--CoffeeBeans--List">
            {coffeeBeans.map((coffeeBean: ICoffeeBean) => {
              const shop: IShop = shops.filter((targetShop: IShop) => targetShop.id === coffeeBean.shopId)[0];

              return (
                <li key={coffeeBean.id} className="HomePage--CoffeeBeans--List--Item">
                  <a href={`/coffee-beans/${coffeeBean.id}`}>
                    <img src={coffeeBean.imageUrl} alt={coffeeBean.name} />
                    <h2>{coffeeBean.name}</h2>
                    <p>{coffeeBean.description}</p>
                    <a href={`/shops/${shop.id}`}>
                      <img src={shop.imageUrl} alt={shop.name} />
                      {shop.name}
                    </a>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    );
  }
}
