
import {Action} from 'routing-controllers';
import {getCustomRepository} from 'typeorm';
import {UserRepository} from '../repository/user.repository';
import {fromPromise} from 'rxjs/internal-compatibility';
import {catchError, map} from 'rxjs/operators';
import {of} from 'rxjs';

export async function roleChecker(action: Action, roles: string[]): Promise<boolean> {
  const res = action.response;
  const id = res.locals.jwtPayload.id;
  const userRepository = getCustomRepository<UserRepository>(UserRepository);
  return fromPromise(userRepository.findOneOrFail(id))
    .pipe(map(user => {
      if (user && !roles.length) {
        return true;
      }
      return roles.includes(user.role);
    }))
    .pipe(catchError(() => of(false)))
    .toPromise();
}
