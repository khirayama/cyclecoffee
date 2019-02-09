// tslint:disable:react-a11y-anchors react-no-dangerous-html
import * as React from 'react';

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

export class CoffeeBeanShowPage extends React.Component<{}, {}> {
  // tslint:disable:max-func-body-length
  public render(): JSX.Element {
    const shop: IShop = {
      id: 'saredo',
      name: 'Saredo Coffee',
      imageUrl: '/images/shop_sample.webp',
    };

    const coffeeBeans: ICoffeeBean = {
      id: 'gohobi',
      name: 'ごほうびブレンド',
      description: 'ごほうびブレンド説明',
      shopId: 'saredo',
      imageUrl: '/images/coffee_bean_sample.jpg',
    };

    return (
      <div className="CoffeeBeanShowPage">
        <h1>Coffee Bean Show Page</h1>
      </div>
    );
  }
}
