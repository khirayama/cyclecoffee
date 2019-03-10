import * as express from 'express';

import { ICoffeeBean, IPlan, IShop } from 'interfaces';

const coffeeBeans: ICoffeeBean[] = [
  {
    id: 'gohobi',
    name: 'ごほうびブレンド',
    description: 'ごほうびブレンド説明',
    shopId: 'saredo',
    imageUrl: '/images/coffee_bean_sample.jpg',
    greenCoffeeBean: {
      name: 'ブラジル',
      country: 'ブラジル',
      farm: 'ブラジル農園',
      height: 1805,
      breed: 'ブルボン',
      process: 'フーリーウォッシュド',
    },
    roastProfile: {
      machine: 'スマートロースター 熱風式70kg釜 プロパンガス',
      season: '2019年2月12日',
      roast: '中煎り',
      profile: [
        {
          time: 0,
          temperature: 190,
        },
        {
          time: 1,
          temperature: 110,
        },
        {
          time: 5,
          temperature: 170,
        },
        {
          time: 8,
          temperature: 210,
        },
        {
          time: 11,
          temperature: 220,
        },
        {
          time: 13,
          temperature: 225,
        },
      ],
    },
  },
  {
    id: 'horoniga',
    name: 'ほろにがブレンド',
    description: 'ほろにがブレンド説明',
    shopId: 'saredo',
    imageUrl: '/images/coffee_bean_sample.jpg',
    greenCoffeeBean: {
      name: 'ブラジル',
      country: 'ブラジル',
      farm: 'ブラジル農園',
      height: 1805,
      breed: 'ブルボン',
      process: 'フーリーウォッシュド',
    },
    roastProfile: {
      machine: 'スマートロースター 熱風式70kg釜 プロパンガス',
      season: '2019年2月12日',
      roast: '中煎り',
      profile: [
        {
          time: 0,
          temperature: 190,
        },
        {
          time: 3,
          temperature: 110,
        },
        {
          time: 5,
          temperature: 170,
        },
        {
          time: 8,
          temperature: 210,
        },
        {
          time: 11,
          temperature: 220,
        },
        {
          time: 13,
          temperature: 225,
        },
      ],
    },
  },
  {
    id: 'ethiopia',
    name: 'エチオピア',
    description: 'エチオピア説明',
    shopId: 'saredo',
    imageUrl: '/images/coffee_bean_sample.jpg',
    greenCoffeeBean: {
      name: 'ブラジル',
      country: 'ブラジル',
      farm: 'ブラジル農園',
      height: 1805,
      breed: 'ブルボン',
      process: 'フーリーウォッシュド',
    },
    roastProfile: {
      machine: 'スマートロースター 熱風式70kg釜 プロパンガス',
      season: '2019年2月12日',
      roast: '中煎り',
      profile: [
        {
          time: 0,
          temperature: 190,
        },
        {
          time: 3,
          temperature: 110,
        },
        {
          time: 5,
          temperature: 170,
        },
        {
          time: 8,
          temperature: 210,
        },
        {
          time: 11,
          temperature: 220,
        },
        {
          time: 13,
          temperature: 225,
        },
      ],
    },
  },
];

const shops: IShop[] = [
  {
    id: 'saredo',
    name: 'Saredo Coffee',
    logoUrl: '/images/shop_logo_sample.webp',
    imageUrl: '/images/shop_sample.webp',
    address: '福岡県福岡市中央区六本松3丁目11-33-101',
  },
];

const plans: IPlan[] = [
  {
    id: 'light',
    name: 'ライト',
    price: 1840,
    numberOfShipping: 2,
    numberOfPack: 1,
    amountOfPack: 100,
  },
];

export function coffeeBeansAPIHandler(req: express.Request, res: express.Response): void {
  res.json(coffeeBeans);
}

export function coffeeBeanAPIHandler(req: express.Request, res: express.Response): void {
  const coffeeBeanId: string = req.params.id;
  const coffeeBean: ICoffeeBean | null = coffeeBeans.filter((cb: ICoffeeBean) => cb.id === coffeeBeanId)[0] || null;
  res.json(coffeeBean);
}

export function shopsAPIHandler(req: express.Request, res: express.Response): void {
  res.json(shops);
}

export function shopAPIHandler(req: express.Request, res: express.Response): void {
  const shopId: string = req.params.id;
  const shop: IShop | null = shops.filter((s: IShop) => s.id === shopId)[0] || null;
  res.json(shop);
}

export function plansAPIHandler(req: express.Request, res: express.Response): void {
  res.json(plans);
}
