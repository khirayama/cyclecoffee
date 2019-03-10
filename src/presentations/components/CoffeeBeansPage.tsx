import * as React from 'react';

import { ICoffeeBean } from 'interfaces';

export interface IProps {
  coffeeBeans: ICoffeeBean[];
}

export class CoffeeBeansPage extends React.Component<IProps, {}> {
  public render(): JSX.Element {
    const coffeeBeans: ICoffeeBean[] = this.props.coffeeBeans;

    return (
      <div className="CoffeeBeansPage">
        <ul className="CoffeeBeansPage--CoffeeBeanList">
          {coffeeBeans.map((coffeeBean: ICoffeeBean) => {
            return (
              <li key={coffeeBean.id} className="CoffeeBeansPage--CoffeeBeanList--Item">
                <a href={`/coffee-beans/${coffeeBean.id}`}>
                  <div className="CoffeeBeansPage--CoffeeBeanList--Item--Image">
                    <div className="CoffeeBeansPage--CoffeeBeanList--Item--Image--Placeholder">
                      <img src={coffeeBean.imageUrl} alt={coffeeBean.name} />
                    </div>
                  </div>
                  <div className="CoffeeBeansPage--CoffeeBeanList--Item--Content">
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
    );
  }
}
