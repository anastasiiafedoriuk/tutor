import {NgModule} from '@angular/core';
import {EffectsModule} from '@ngrx/effects';
import {CameraEffects} from './store/camera.effects';
import {StoreModule} from '@ngrx/store';
import {CameraStore} from './camera.store';
import {CameraReducer} from './store/camera.reducer';
import {CameraService} from './camera.service';

@NgModule({
  imports: [
    StoreModule.forFeature(CameraStore.storeName, CameraReducer.reducer),
    EffectsModule.forFeature([CameraEffects])
  ],
  providers: [
    CameraService,
    CameraStore
  ]
})
export class CameraSoreModule {}
