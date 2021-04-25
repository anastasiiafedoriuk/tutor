import {Injectable} from '@angular/core';
import {BaseStore} from '../../../common/store/base/base.store';
import {ILoginState} from './store/login.state';
import {LoginActions} from './store/login.actions';

@Injectable()
export class LoginStore extends BaseStore<ILoginState> {

  static storeName: string = 'login';

  actions = LoginActions;

  get storeName(): string {
    return LoginStore.storeName;
  }
}
