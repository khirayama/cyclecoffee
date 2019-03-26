import * as React from 'react';

import { ICoffeeBean } from 'interfaces';

export function CoffeeBeanCard(props: { coffeeBean: ICoffeeBean }): JSX.Element {
  const coffeeBean: ICoffeeBean = props.coffeeBean;

  return (
    <div className="CoffeeBeanCard">
      <a href={`/coffee-beans/${coffeeBean.id}`}>
        <div className="CoffeeBeanCard--Image">
          <img src={coffeeBean.imageUrl} alt={coffeeBean.name} />
        </div>
        <div className="CoffeeBeanCard--Content">
          <h2>{coffeeBean.name}</h2>
          <p>{coffeeBean.description}</p>
        </div>
      </a>
    </div>
  );
}
