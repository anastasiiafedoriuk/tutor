import {Action} from 'routing-controllers';
import {JwtService} from '../services/jwt.service';
import {getManager} from 'typeorm';
import {verify} from 'jsonwebtoken';
import {config} from '../config';
import {User} from '../entity/User';

export async function getCurrentUser(action: Action): Promise<User> {
  const token = JwtService.extractTokenFromHeader(action.request);
  const jwtPayload = verify(token, config.jwtSecret);
  return getManager().findOne(User, (jwtPayload as Record<'data', Partial<User>>).data.id);
}
