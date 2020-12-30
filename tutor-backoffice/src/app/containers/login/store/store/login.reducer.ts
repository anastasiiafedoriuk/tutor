import {ILoginState} from './login.state';
import {Action, createReducer, on} from '@ngrx/store';
import {LoginActions} from './login.actions';

export namespace LoginReducer {

  export const initialState: ILoginState = {
    user: null
  };

  export function reducer(state: ILoginState, action: Action): ILoginState {
    return createReducer<ILoginState>(
      initialState,
      on(LoginActions.LoginSuccess, (state, action) => ({...state, user: action.payload}))
    )(state, action);
  }
}
