import * as React from 'react';

import { IShop } from 'interfaces';

export function ShopCard(props: { shop: IShop }): JSX.Element {
  return (
    <div>
      <img src={props.shop.imageUrl} alt={props.shop.name} />
      <p>{props.shop.name}</p>
    </div>
  );
}
