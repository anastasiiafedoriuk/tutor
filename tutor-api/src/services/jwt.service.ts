import {Service} from 'typedi';
import {compareSync, genSaltSync, hashSync} from 'bcryptjs';
import {User} from '../entity/User';
import {sign} from 'jsonwebtoken';
import {Observable, of, throwError} from 'rxjs';
import {Request} from 'express';
import {config} from '../config';
import {UnauthorizedError} from 'routing-controllers';

@Service()
export class JwtService {

  static extractTokenFromHeader(req: Request): string {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
      return req.headers.authorization.split(' ')[1];
    }
  }

  hash(password: string): string {
    return hashSync(password, genSaltSync());
  }

  generateJwt(user: Partial<User>): string {
    const payload: Record<'data', Partial<User>> = {
      data: {
        id: user.id,
        email: user.email,
        role: user.role
      }
    };
    return sign(payload, config.jwtSecret, {expiresIn: '48h'});
  }

  checkPassword(checked: string, user: User): Observable<User> {
    if (!compareSync(checked, user.password)) {
      return throwError(new UnauthorizedError());
    }
    return of(user);
  }
}
