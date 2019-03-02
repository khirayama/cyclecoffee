import { AxiosResponse } from 'axios';

import { IPlan } from 'interfaces';
import { req } from 'services/utils';

export const Plan = {
  fetch: (): Promise<IPlan[]> => {
    return new Promise(
      (resolve: (plans: IPlan[]) => void): void => {
        req.get('/api/plans').then((res: AxiosResponse) => {
          resolve(res.data);
        });
      },
    );
  },
};
