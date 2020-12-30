import {EntityRepository, Repository} from 'typeorm';
import {User} from '../entity/User';
import {Observable, of, throwError} from 'rxjs';
import {fromPromise} from 'rxjs/internal-compatibility';
import {switchMap} from 'rxjs/operators';
import {UnauthorizedError} from 'routing-controllers';

@EntityRepository(User)
export class UserRepository extends Repository<User> {

  getByEmail(email: string,): Observable<User> {
    return fromPromise(this.findOneOrFail({
      where: {email}
    }));
  }

  findRegistered(user: User): Observable<User> {
    return fromPromise(this.findOne({
      where: {
        email: user.email
      }
    }))
      .pipe(switchMap(res => {
        if (!res) {
          return of(user);
        }
        return throwError(new UnauthorizedError());
      }));
  }
}
