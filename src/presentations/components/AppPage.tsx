import * as React from 'react';

import { ICoffeeBean, IPlan, IShop } from 'interfaces';
import { CoffeeBeanCard } from 'presentations/components/CoffeeBeanCard';
import { Footer } from 'presentations/components/Footer';
import { Header } from 'presentations/components/Header';
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
        <Header isSignedIn={this.props.isSignedIn} />
        <div className="AppPage--Content">
          {selectedCoffeeBeanIds.length ? (
            <>
              <div>次回お届け予定のコーヒー豆</div>
              <CoffeeBeanCard coffeeBean={coffeeBeans[0]} />
              <small>生産状況により代理豆をお届けする場合があります。ご了承ください。</small>
            </>
          ) : (
            <>
              <div>最初のコーヒー豆を選ぼう</div>
              <ul className="AppPage--Content--CoffeeBeanList">
                {coffeeBeans.map((coffeeBean: ICoffeeBean) => {
                  return (
                    <li key={coffeeBean.id} className="AppPage--Content--CoffeeBeanList--Item">
                      <CoffeeBeanCard coffeeBean={coffeeBean} />
                      <CoffeeBeanSelectButtonContainer />
                    </li>
                  );
                })}
              </ul>
            </>
          )}
          <div>ロースター紹介</div>
          <div>スキップ</div>
          <input type="checkbox" checked={isSkipped} onChange={() => console.log('change')} />
          <div />
        </div>
        <Footer />
      </div>
    );
  }
}
