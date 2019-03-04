import { ICoffeeBean, IPlan, IShop } from 'interfaces';

export interface IState {
  isSignedIn: boolean;
  plans: IPlan[];
  coffeeBeans: ICoffeeBean[];
  shops: IShop[];
  isSkipped: boolean;
  selectedCoffeeBeanIds: string[];
}
