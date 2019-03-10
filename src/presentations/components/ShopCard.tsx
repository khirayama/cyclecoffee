import * as React from 'react';

import { IShop } from 'interfaces';

export function ShopCard(props: { shop: IShop }): JSX.Element {
  return (
    <div className="ShopCard">
      <div className="ShopCard--Logo">
        <div className="ShopCard--Logo--Placeholder">
          <img src={props.shop.logoUrl} alt={props.shop.name} />
        </div>
      </div>
      <div className="ShopCard--Content">
        <div className="ShopCard--Content--Name">{props.shop.name}</div>
        <div className="ShopCard--Content--Address">{props.shop.address}</div>
      </div>
    </div>
  );
}
