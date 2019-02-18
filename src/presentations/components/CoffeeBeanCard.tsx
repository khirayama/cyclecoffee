import * as React from 'react';

import { ICoffeeBean } from 'interfaces';

// tslint:disable-next-line: function-name
export function CoffeeBeanCard(props: { coffeeBean: ICoffeeBean }): JSX.Element {
  const coffeeBean: ICoffeeBean = props.coffeeBean;

  return (
    <div className="CoffeeBeanCard">
      <div className="CoffeeBeanCard--Content">
        <a href={`/coffee-beans/${coffeeBean.id}`}>
          <img src={coffeeBean.imageUrl} alt={coffeeBean.name} />
          <h2>{coffeeBean.name}</h2>
          <p>{coffeeBean.description}</p>
        </a>
      </div>
    </div>
  );
}
