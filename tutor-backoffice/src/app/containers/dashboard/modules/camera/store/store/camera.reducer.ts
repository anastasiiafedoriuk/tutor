import {ICameraSate} from './camera.sate';
import {Action, createReducer, on} from '@ngrx/store';
import {CameraActions} from './camera.actions';

export namespace CameraReducer {

  export const initialSate: ICameraSate = {
    loaded: false,
    loading: false,
    data: null
  };

  export function reducer(state: ICameraSate, action: Action): ICameraSate {
    return createReducer(
      initialSate,
      on(CameraActions.Load, state => ({...state, loading: true, loaded: false})),
      on(CameraActions.LoadSuccess, (state, action) => ({...state, loaded: true, loading: false, data: action.payload}))
    )(state, action);
  }
}
