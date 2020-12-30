import {ExpressMiddlewareInterface} from 'routing-controllers';
import {Request, Response, NextFunction} from 'express';
import {verify} from 'jsonwebtoken';
import {config} from '../config';
import {Service} from 'typedi';
import {JwtService} from '../services/jwt.service';
import {User} from '../entity/User';

@Service()
export class AuthMiddleware implements ExpressMiddlewareInterface {

  constructor(private readonly jwtService: JwtService) {
  }

  use(request: Request, response: Response, next: NextFunction): void {
    const token = JwtService.extractTokenFromHeader(request);
    let jwtPayload;

    try {
      jwtPayload = verify(token, config.jwtSecret);
      response.locals.jwtPayload = jwtPayload;
    } catch (err) {
      response.status(401).send({response: err});
      return;
    }
    const newToken = this.jwtService.generateJwt((jwtPayload as Record<'data', Partial<User>>).data);
    response.setHeader('Authorization', `Bearer ${newToken}`);
    next();
  }
}
