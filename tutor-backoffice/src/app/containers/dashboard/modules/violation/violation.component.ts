import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {ViolationService} from './violation.service';
import {Observable} from 'rxjs';
import {IViolation} from './interfaces/violation.interface';

@Component({
  selector: 'app-record',
  templateUrl: './violation.component.html',
  styleUrls: ['./violation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ViolationComponent implements OnInit {

  constructor(private readonly recordService: ViolationService) { }

  displayedColumns: string[] = ['plate', 'speed', 'created'];

  violations$: Observable<IViolation[]> = this.recordService.getViolations();

  ngOnInit(): void {

  }

}
