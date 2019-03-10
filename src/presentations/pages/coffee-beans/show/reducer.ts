import { IAction } from 'interfaces';
import { actionTypes } from 'presentations/pages/coffee-beans/show/actionTypes';
import { IState } from 'presentations/pages/coffee-beans/show/interfaces';

export function reducer(state: IState, action: IAction): IState {
  const newState: IState = JSON.parse(JSON.stringify(state));
  const payload: {} = action.payload;

  return newState;
}
