// tslint:disable:react-a11y-anchors react-no-dangerous-html
import * as React from 'react';

import { ICoffeeBean, IPlan, IShop } from 'interfaces';
import { CoffeeBeanCard } from 'presentations/components/CoffeeBeanCard';
import { Footer } from 'presentations/components/Footer';
import { Header } from 'presentations/components/Header';

export interface IProps {
  plans: IPlan[];
  coffeeBeans: ICoffeeBean[];
  shops: IShop[];
}

export class HomePage extends React.Component<IProps, {}> {
  // tslint:disable:max-func-body-length
  public render(): JSX.Element {
    const plans: IPlan[] = this.props.plans;
    const coffeeBeans: ICoffeeBean[] = this.props.coffeeBeans;
    const shops: IShop[] = this.props.shops;

    return (
      <div className="HomePage">
        <Header />
        <div className="HomePage--Message">
          <div className="HomePage--Message--Content">
            <h2>
              素敵なコーヒーとの出会いを。
              <br />
              あなたの過ごし方のパートナーに。
              <br />
              コーヒー豆定期便、お届けします。
            </h2>
          </div>
        </div>
        <div className="HomePage--Steps">
          <div className="HomePage--Steps--Content">
            <h2 className="HomePage--Steps--Content--Heading">cycle coffeeが届くまで</h2>
            <ul className="HomePage--Steps--Content--List">
              <li className="HomePage--Steps--Content--List--Item">
                <div className="HomePage--Steps--Content--List--Item--Step">
                  <h3>1. マイページを作ります。</h3>
                  <p>
                    登録（サインアップ）して、マイページを作ります。
                    マイページではお好きなコーヒー豆を選んだり、お届け先変更、スキップ、決済方法変更などが行えます。
                  </p>
                </div>
              </li>
              <li className="HomePage--Steps--Content--List--Item">
                <div className="HomePage--Steps--Content--List--Item--Step">
                  <h3>2. コーヒー豆を選びます。</h3>
                  <p>
                    マイページなどから次回飲んでみたいコーヒー豆を選びます。
                    毎回自由に組み合わせることもできます。お気に入りのコーヒー豆を見つけてください！
                  </p>
                </div>
              </li>
              <li className="HomePage--Steps--Content--List--Item">
                <div className="HomePage--Steps--Content--List--Item--Step">
                  <h3>3. ポストにお届け</h3>
                  <p>お選びいただいたコーヒー豆をポストにお届けします。 月に2度、1日と15日に発送します。</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div className="HomePage--Plans">
          <div className="HomePage--Plans--Content">
            <h2 className="HomePage--Plans--Content--Heading">
              月に2度、新鮮なコーヒー豆をお届けます。お好みの量をお選びください。
            </h2>
            <ul className="HomePage--Plans--Content--List">
              {plans.map((plan: IPlan) => {
                return (
                  <li key={plan.id} className="HomePage--Plans--Content--List--Item">
                    <div className="HomePage--Plans--Content--List--Item--Plan">
                      <h2>{plan.name}</h2>
                      <p>{plan.price} 円</p>
                      <p>{plan.numberOfShipping * plan.numberOfPack * plan.amountOfPack} g / 月</p>
                      <p>
                        月 {plan.numberOfShipping} 回、 {plan.amountOfPack * plan.numberOfPack} gずつのお届け。
                      </p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        <div className="HomePage--CoffeeBeans">
          <div className="HomePage--CoffeeBeans--Content">
            <h2 className="HomePage--CoffeeBeans--Content--Heading">コーヒー豆をお選びいただけます</h2>
            <ul className="HomePage--CoffeeBeans--Content--List">
              {coffeeBeans.map((coffeeBean: ICoffeeBean) => {
                const shop: IShop = shops.filter((targetShop: IShop) => targetShop.id === coffeeBean.shopId)[0];

                return (
                  <li key={coffeeBean.id} className="HomePage--CoffeeBeans--Content--List--Item">
                    <CoffeeBeanCard coffeeBean={coffeeBean} />
                    <div className="HomePage--CoffeeBeans--Content--List--Item--Roaster">
                      <a href={`/shops/${shop.id}`}>
                        <img src={shop.imageUrl} alt={shop.name} />
                        {shop.name}
                      </a>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}
