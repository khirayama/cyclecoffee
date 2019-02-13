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

export interface ICoffeeBean {
  id: string;
  name: string;
  description: string;
  shopId: string;
  imageUrl: string;
}
