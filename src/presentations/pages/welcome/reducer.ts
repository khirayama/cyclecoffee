import { IAction } from 'interfaces';
import { actionTypes } from 'presentations/pages/welcome/actionTypes';
import { IState } from 'presentations/pages/welcome/interfaces';

export function reducer(state: IState, action: IAction): IState {
  const newState: IState = JSON.parse(JSON.stringify(state));
  const payload: {} = action.payload;

  return newState;
}
