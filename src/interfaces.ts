import { IEventOptions, IExceptionOptions, IPageViewOptions, Tracker } from 'presentations/utils/tracker';

declare global {
  interface Window {
    state: any;
    options: {
      env: string;
      gaCode: string;
      route: string;
    };
    tracker: Tracker;
    ga(...args: (string | IPageViewOptions | IEventOptions | IExceptionOptions)[]): void;
  }
}

export type IDispatch = (action: IAction) => void;

export interface IAction {
  actionType: Symbol;
  payload?: any;
  meta?: any;
  error?: any;
}

export interface IPlan {
  id: string;
  name: string;
  price: number;
  numberOfShipping: number;
  numberOfPack: number;
  amountOfPack: number;
}

export interface IShop {
  id: string;
  name: string;
  logoUrl: string;
  imageUrl: string;
  address: string;
}

interface IGreenCoffeeBean {
  name: string;
  country: string;
  farm: string;
  height: number;
  breed: string;
  process: string;
}

interface IRoastProfile {
  time: number;
  temperature: number;
}

export interface ICoffeeBean {
  id: string;
  name: string;
  description: string;
  shopId: string;
  imageUrl: string;
  greenCoffeeBean: IGreenCoffeeBean;
  roastProfile: {
    machine: string;
    season: string;
    roast: string;
    profile: IRoastProfile[];
  };
}
