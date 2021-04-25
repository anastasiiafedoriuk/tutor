import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {LocalStorage} from '../../common/services/local-storage.service';

@Injectable()
export class DashboardGuard implements CanActivate {

  constructor(private readonly router: Router,
              private readonly localStorage: LocalStorage) {
  }

  canActivate(): boolean {
    const canActivate = this.localStorage.getItem('tutor_token');
    if (!canActivate) {
      this.router.navigate(['login']);
    }
    return !!canActivate;
  }
}
