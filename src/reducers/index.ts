/* eslint-disable */
import { IAction, IState } from 'interfaces';
import { actionTypes } from 'actionCreators/actionTypes';

export function reducer(state: IState, action: IAction): IState {
  const newState: IState = JSON.parse(JSON.stringify(state));
  const payload: {} = action.payload;

  return newState;
}
