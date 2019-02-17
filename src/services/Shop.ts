import axios, { AxiosInstance, AxiosResponse } from 'axios';

import { IShop } from 'interfaces';
import { req } from 'services/utils';

// tslint:disable-next-line:variable-name typedef
export const Shop = {
  fetch: (): Promise<IShop[]> => {
    return new Promise(
      (resolve: (shops: IShop[]) => void): void => {
        req.get('/api/shops').then((res: AxiosResponse) => {
          resolve(res.data);
        });
      },
    );
  },
  find: (id: string): Promise<IShop> => {
    return new Promise(
      (resolve: (shop: IShop) => void): void => {
        req.get(`/api/shops/${id}`).then((res: AxiosResponse) => {
          resolve(res.data);
        });
      },
    );
  },
};
