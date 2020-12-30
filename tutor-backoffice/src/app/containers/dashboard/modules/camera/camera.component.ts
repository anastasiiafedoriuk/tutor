import {Component, OnInit, ChangeDetectionStrategy, AfterViewInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {CameraStore} from './store/camera.store';
import {ActionDispatcher} from '../../../../common/store/base/action-dispatcher';
import {Observable, of} from 'rxjs';
import {ICamera} from './interfaces/camera.interface';
import {distinctUntilChanged, filter, map, tap} from 'rxjs/operators';
import {isEqual} from 'lodash-es';

@Component({
  selector: 'app-camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CameraComponent implements AfterViewInit {

  displayedColumns: string[] = ['latitude', 'longitude',  'speed', 'mapLink', 'actions'];

  dataSource$: Observable<MatTableDataSource<ICamera>>;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private readonly cameraStore: CameraStore) {
  }

  ngAfterViewInit() {
    this.cameraStore.dispatch(new ActionDispatcher(this.cameraStore.actions.TActions.Load));
    this.dataSource$ = this.cameraStore.select$('data')
      .pipe(filter<ICamera[]>(Boolean))
      .pipe(distinctUntilChanged((prev, cur) => isEqual(prev, cur)))
      .pipe(map(res => new MatTableDataSource<ICamera>(res)))
      .pipe(tap(source => setTimeout(() => source.paginator = this.paginator, 100)))
  }

}
