import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {RecordService} from './record.service';
import {Observable} from 'rxjs';
import {IRecord} from './interfaces/record.interface';

@Component({
  selector: 'app-record',
  templateUrl: './record.component.html',
  styleUrls: ['./record.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecordComponent implements OnInit {

  constructor(private readonly recordService: RecordService) { }

  displayedColumns: string[] = ['plate', 'speed',  'created', 'cameraPoint'];

  records$: Observable<IRecord[]> = this.recordService.getRecords();

  ngOnInit(): void {

  }

}
