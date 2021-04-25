import {Injectable} from '@angular/core';
import {IAuthPayload} from '../interfaces/auth-payload.interface';
import {Observable} from 'rxjs';
import {IUser} from '../interfaces/user.inerface';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class LoginService {

  constructor(private readonly http: HttpClient) {
  }

  login(payload: IAuthPayload): Observable<IUser> {
    return this.http.post<IUser>(`/auth/login`, payload);
  }
}
