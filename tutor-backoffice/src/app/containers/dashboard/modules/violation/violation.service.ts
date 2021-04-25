import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {IViolation} from './interfaces/violation.interface';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class ViolationService {

  constructor(private readonly http: HttpClient) {
  }

  getViolations(): Observable<IViolation[]> {
    return this.http.get<IViolation[]>('/violation');
  }
}
