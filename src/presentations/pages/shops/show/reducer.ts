import { IAction } from 'interfaces';
import { actionTypes } from 'presentations/pages/shops/show/actionTypes';
import { IState } from 'presentations/pages/shops/show/interfaces';

export function reducer(state: IState, action: IAction): IState {
  const newState: IState = JSON.parse(JSON.stringify(state));
  const payload: {} = action.payload;

  return newState;
}
