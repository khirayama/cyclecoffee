declare global {
  // tslint:disable-next-line:interface-name
  interface Window {
    // tslint:disable-next-line:no-any
    state: any;
  }
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
  imageUrl: string;
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
