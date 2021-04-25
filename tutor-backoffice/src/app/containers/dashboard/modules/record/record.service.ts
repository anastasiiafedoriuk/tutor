import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {IRecord} from './interfaces/record.interface';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class RecordService {

  constructor(private readonly http: HttpClient) {
  }

  getRecords(): Observable<IRecord[]> {
    return this.http.get<IRecord[]>('/record');
  }
}
