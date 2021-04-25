import {NgModule} from '@angular/core';
import {StoreModule} from '@ngrx/store';
import {LoginReducer} from './store/login.reducer';
import {EffectsModule} from '@ngrx/effects';
import {LoginEffects} from './store/login.effects';
import {LoginService} from './login.service';
import {LoginStore} from './login.store';

@NgModule({
  imports: [
    StoreModule.forFeature(LoginStore.storeName, LoginReducer.reducer),
    EffectsModule.forFeature([LoginEffects])
  ],
  providers: [
    LoginService,
    LoginEffects,
    LoginStore
  ]
})
export class LoginStoreModule {
}
