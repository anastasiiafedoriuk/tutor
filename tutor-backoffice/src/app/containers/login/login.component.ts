import { Component, ChangeDetectionStrategy } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@ng-stack/forms';
import {IAuthPayload} from './interfaces/auth-payload.interface';
import {LoginStore} from './store/login.store';
import {ActionDispatcher} from '../../common/store/base/action-dispatcher';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent {

  readonly form: FormGroup<IAuthPayload> = new FormGroup<IAuthPayload>({
    email: new FormControl<string>('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });

  constructor(private readonly loginStore: LoginStore) { }

  login(): void {
    if (this.form.invalid) {
      return;
    }
    this.loginStore.dispatch(new ActionDispatcher(this.loginStore.actions.TActions.Login, this.form.value));
  }

}
