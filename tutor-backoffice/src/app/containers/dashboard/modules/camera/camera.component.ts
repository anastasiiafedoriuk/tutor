import {Component, ChangeDetectionStrategy, AfterViewInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {CameraStore} from './store/camera.store';
import {ActionDispatcher} from '../../../../common/store/base/action-dispatcher';
import {Observable} from 'rxjs';
import {ICamera} from './interfaces/camera.interface';

@Component({
  selector: 'app-camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CameraComponent implements AfterViewInit {

  displayedColumns: string[] = ['latitude', 'longitude',  'speed', 'mapLink', 'actions'];

  dataSource$: Observable<ICamera[]> = this.cameraStore.select$('data');

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private readonly cameraStore: CameraStore) {
  }

  ngAfterViewInit() {
    this.cameraStore.dispatch(new ActionDispatcher(this.cameraStore.actions.TActions.Load));
  }

}
