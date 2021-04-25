import {createAction, props} from '@ngrx/store';
import {Payload} from '../../../../common/interfaces/payload.inerface';
import {IAuthPayload} from '../../interfaces/auth-payload.interface';
import {IUser} from '../../interfaces/user.inerface';

export namespace LoginActions {

  export enum TActions {
    Login = '[Login] Login',
    LoginSuccess = '[Login] Success'
  }

  export const Login = createAction(TActions.Login, props<Payload<IAuthPayload>>());
  export const LoginSuccess = createAction(TActions.LoginSuccess, props<Payload<IUser>>());
}
