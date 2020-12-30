import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ICamera} from '../interfaces/camera.interface';

@Injectable()
export class CameraService {

  constructor(private readonly http: HttpClient) {
  }

  get(): Observable<ICamera[]> {
    return this.http.get<ICamera[]>('/camera');
  }
}
