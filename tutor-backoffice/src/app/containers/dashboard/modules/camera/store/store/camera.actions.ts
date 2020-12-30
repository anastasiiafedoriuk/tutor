import {createAction, props} from '@ngrx/store';
import {Payload} from '../../../../../../common/interfaces/payload.inerface';
import {ICamera} from '../../interfaces/camera.interface';

export namespace CameraActions {

  export enum TActions {
    Load = '[Camera] Load',
    LoadSuccess = '[Camera] Load Success',
    Fail = '[Camera] Fail'
  }

  export const Load = createAction(TActions.Load);
  export const LoadSuccess = createAction(TActions.LoadSuccess, props<Payload<ICamera[]>>());
  export const Fail = createAction(TActions.Fail);
}
