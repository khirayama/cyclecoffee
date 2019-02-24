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
export class HomePage extends React.Component<IProps> {
  // tslint:disable:max-func-body-length
  public render(): JSX.Element {
    const plans: IPlan[] = this.props.plans;
    const coffeeBeans: ICoffeeBean[] = this.props.coffeeBeans;
    const shops: IShop[] = this.props.shops;

    return (
      <div className="HomePage">
        <Header isSignedIn={this.props.isSignedIn} />
        <div className="HomePage--Message">
          <div className="HomePage--Message--Content">
            <h2>なんとかかんとか、コーヒー便</h2>
            <a href="/app">Start on WEB</a>
          </div>
        </div>
        <div className="HomePage--Steps">
          <div className="HomePage--Steps--Content">
            <ul className="HomePage--Steps--Content--List">
              <li className="HomePage--Steps--Content--List--Item">
                <div className="HomePage--Steps--Content--List--Item--Step">
                  <h3>選べるコーヒー豆</h3>
                  <p>
                    厳選されたコーヒーロースターのコーヒー豆をお届けします。
                    産地、焙煎具合、ディカフェなど、さまざまなテイスト、シーンに合わせて選べます。
                  </p>
                </div>
              </li>
              <li className="HomePage--Steps--Content--List--Item">
                <div className="HomePage--Steps--Content--List--Item--Step">
                  <h3>ポストに投函</h3>
                  <p>コーヒー豆は専用ボックスでポストにお届け。忙しくても受け取れます。</p>
                </div>
              </li>
              <li className="HomePage--Steps--Content--List--Item">
                <div className="HomePage--Steps--Content--List--Item--Step">
                  <h3>美味しく飲める</h3>
                  <p>ロースターが勧める最適なレシピもご紹介。より美味しく、よりよい時間を。</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div className="HomePage--Plans">
          <div className="HomePage--Plans--Content">
            <h2 className="HomePage--Plans--Content--Heading">月に2度、新鮮なコーヒー豆をお届けます。</h2>
            <ul className="HomePage--Plans--Content--List">
              {plans.map((plan: IPlan) => {
                return (
                  <li key={plan.id} className="HomePage--Plans--Content--List--Item">
                    <div className="HomePage--Plans--Content--List--Item--Plan">
                      <p>{plan.price} 円</p>
                      <p>{plan.numberOfShipping * plan.numberOfPack * plan.amountOfPack} g / 月</p>
                      <p>
                        隔週月{plan.numberOfShipping}回、 {plan.amountOfPack * plan.numberOfPack}{' '}
                        gずつのお届け。新鮮なコーヒー豆をずっと。
                      </p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        <div className="HomePage--Steps">
          <div className="HomePage--Steps--Content">
            <h2 className="HomePage--Steps--Content--Heading">どんなコーヒー豆があるの？</h2>
            <ul className="HomePage--Steps--Content--List">
              <li className="HomePage--Steps--Content--List--Item">
                <div className="HomePage--Steps--Content--List--Item--Step">
                  <h3>おいしいコーヒー豆だけ</h3>
                  <p>厳選されたコーヒーロースターから自信を持っておすすめできるコーヒー豆をお届けします。</p>
                </div>
              </li>
              <li className="HomePage--Steps--Content--List--Item">
                <div className="HomePage--Steps--Content--List--Item--Step">
                  <h3>出来立てのコーヒー豆を</h3>
                  <p>
                    ご注文確定日以降に焙煎したコーヒー豆をお届けします。(配送地域によって、より期間が開いてしまうことがあります)
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div className="HomePage--CoffeeBeans">
          <div className="HomePage--CoffeeBeans--Content">
            <h2 className="HomePage--CoffeeBeans--Content--Heading">例えば...</h2>
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
        <div className="HomePage--Steps">
          <div className="HomePage--Steps--Content">
            <h2 className="HomePage--Steps--Content--Heading">楽しんで続けられる</h2>
            <ul className="HomePage--Steps--Content--List">
              <li className="HomePage--Steps--Content--List--Item">
                <div className="HomePage--Steps--Content--List--Item--Step">
                  <h3>そのまま保存</h3>
                  <p>2週間の保存に耐えられるコンパクトなパッケージでお届け。</p>
                </div>
              </li>
              <li className="HomePage--Steps--Content--List--Item">
                <div className="HomePage--Steps--Content--List--Item--Step">
                  <h3>webで管理</h3>
                  <p>webアプリで、お届け予定のコーヒー豆や新規追加、スキップなど管理できます。</p>
                </div>
              </li>
              <li className="HomePage--Steps--Content--List--Item">
                <div className="HomePage--Steps--Content--List--Item--Step">
                  <h3>安心の保証つき</h3>
                  <p>万が一、状態がよくないコーヒー豆が届いても、新しいものを無料で再送します。</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div className="HomePage--Message">
          <div className="HomePage--Message--Content">
            <h2>なんとかかんとか、コーヒー便</h2>
            <a href="/app">Start on WEB</a>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}
