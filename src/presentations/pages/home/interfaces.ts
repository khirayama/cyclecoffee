export type IDispatch = (action: IAction) => void;

export interface IState {
  count: number;
}

export interface IAction {
  actionType: Symbol;
  payload?: any;
  meta?: any;
  error?: any;
}
