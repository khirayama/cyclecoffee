import * as express from 'express';

import { ICoffeeBean, IPlan, IShop } from 'interfaces';

const coffeeBeans: ICoffeeBean[] = [
  {
    id: 'gohobi',
    name: 'ごほうびブレンド',
    description: 'ごほうびブレンド説明',
    shopId: 'saredo',
    imageUrl: '/images/coffee_bean_sample.jpg',
  },
  {
    id: 'horoniga',
    name: 'ほろにがブレンド',
    description: 'ほろにがブレンド説明',
    shopId: 'saredo',
    imageUrl: '/images/coffee_bean_sample.jpg',
  },
  {
    id: 'Ethiopia',
    name: 'エチオピア',
    description: 'エチオピア説明',
    shopId: 'saredo',
    imageUrl: '/images/coffee_bean_sample.jpg',
  },
];

const shops: IShop[] = [
  {
    id: 'saredo',
    name: 'Saredo Coffee',
    imageUrl: '/images/shop_sample.webp',
  },
];

const plans: IPlan[] = [
  {
    id: 'light',
    name: 'ライト',
    price: 1780,
    numberOfShipping: 2,
    numberOfPack: 1,
    amountOfPack: 100,
  },
  {
    id: 'standard',
    name: 'スタンダード',
    price: 2580,
    numberOfShipping: 2,
    numberOfPack: 2,
    amountOfPack: 100,
  },
  {
    id: 'heavy',
    name: 'ヘビー',
    price: 3380,
    numberOfShipping: 2,
    numberOfPack: 4,
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
