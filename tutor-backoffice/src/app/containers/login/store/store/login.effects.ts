import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {LoginActions} from './login.actions';
import {map, switchMap} from 'rxjs/operators';
import {LoginService} from '../login.service';
import {Payload} from '../../../../common/interfaces/payload.inerface';
import {IAuthPayload} from '../../interfaces/auth-payload.interface';
import {Router} from '@angular/router';
import {IUser} from '../../interfaces/user.inerface';
import {ActionDispatcher} from '../../../../common/store/base/action-dispatcher';
import {LocalStorage} from '../../../../common/services/local-storage.service';

@Injectable()
export class LoginEffects {

  constructor(private readonly actions$: Actions,
              private readonly loginService: LoginService,
              private readonly router: Router,
              private readonly localStorage: LocalStorage) {
  }

  @Effect()
  login$ = this.actions$
    .pipe(ofType(LoginActions.TActions.Login))
    .pipe(switchMap((action: Payload<IAuthPayload>) => this.loginService.login(action.payload)
      .pipe(map(res => new ActionDispatcher(LoginActions.TActions.LoginSuccess,res)))
    ));

  @Effect({dispatch: false})
  loginSuccess$ = this.actions$
    .pipe(ofType(LoginActions.TActions.LoginSuccess))
    .pipe(map((action: Payload<IUser>) => {
      this.localStorage.setItem('tutor_token', action.payload.token);
      this.router.navigate(['dashboard']);
    }))
}
