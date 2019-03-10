import * as React from 'react';

import { ICoffeeBean } from 'interfaces';
import { Navigation } from 'presentations/components/Navigation';

export interface IProps {
  coffeeBeans: ICoffeeBean[];
}

export class CoffeeBeansPage extends React.Component<IProps, {}> {
  public render(): JSX.Element {
    const coffeeBeans: ICoffeeBean[] = this.props.coffeeBeans;

    return (
      <div className="CoffeeBeansPage">
        <div className="CoffeeBeansPage--Content">
          <ul className="CoffeeBeansPage--Content--CoffeeBeanList">
            {coffeeBeans.map((coffeeBean: ICoffeeBean) => {
              return (
                <li key={coffeeBean.id} className="CoffeeBeansPage--Content--CoffeeBeanList--Item">
                  <a href={`/coffee-beans/${coffeeBean.id}`}>
                    <div className="CoffeeBeansPage--Content--CoffeeBeanList--Item--Image">
                      <div className="CoffeeBeansPage--Content--CoffeeBeanList--Item--Image--Placeholder">
                        <img src={coffeeBean.imageUrl} alt={coffeeBean.name} />
                      </div>
                    </div>
                    <div className="CoffeeBeansPage--Content--CoffeeBeanList--Item--Content">
                      <div>{coffeeBean.name}</div>
                      <div>{coffeeBean.description}</div>
                      <div>{coffeeBean.shopId}</div>
                    </div>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
        <Navigation pathname="/" />
      </div>
    );
  }
}
