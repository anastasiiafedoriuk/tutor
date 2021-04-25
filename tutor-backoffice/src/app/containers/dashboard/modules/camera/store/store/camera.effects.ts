import {Injectable} from '@angular/core';
import {CameraService} from '../camera.service';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {CameraActions} from './camera.actions';
import {map, switchMap} from 'rxjs/operators';
import {ActionDispatcher} from '../../../../../../common/store/base/action-dispatcher';

@Injectable()
export class CameraEffects {

  constructor(private readonly actions$: Actions,
              private readonly cameraService: CameraService) {
  }

  @Effect()
  load$ = this.actions$
    .pipe(ofType(CameraActions.TActions.Load))
    .pipe(switchMap(() => this.cameraService.get()
      .pipe(map(res => new ActionDispatcher(CameraActions.TActions.LoadSuccess, res)))
    ));
}
