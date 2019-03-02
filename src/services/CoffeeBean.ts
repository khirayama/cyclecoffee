import { AxiosResponse } from 'axios';

import { ICoffeeBean } from 'interfaces';
import { req } from 'services/utils';

// tslint:disable-next-line:variable-name typedef
export const CoffeeBean = {
  fetch: (): Promise<ICoffeeBean[]> => {
    return new Promise(
      (resolve: (coffeeBeans: ICoffeeBean[]) => void): void => {
        req.get('/api/coffee-beans').then((res: AxiosResponse) => {
          resolve(res.data);
        });
      },
    );
  },
  find: (id: string): Promise<ICoffeeBean> => {
    return new Promise(
      (resolve: (coffeeBean: ICoffeeBean) => void): void => {
        req.get(`/api/coffee-beans/${id}`).then((res: AxiosResponse) => {
          resolve(res.data);
        });
      },
    );
  },
};
