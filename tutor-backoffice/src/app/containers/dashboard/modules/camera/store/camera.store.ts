import {Injectable} from '@angular/core';
import {BaseStore} from '../../../../../common/store/base/base.store';
import {ICameraSate} from './store/camera.sate';
import {CameraActions} from './store/camera.actions';

@Injectable()
export class CameraStore extends BaseStore<ICameraSate> {

  static storeName = 'camera';

  actions = CameraActions;

  get storeName(): string {
    return CameraStore.storeName;
  }
}
