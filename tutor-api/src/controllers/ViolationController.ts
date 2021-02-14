import {Authorized, Get, JsonController, QueryParam, UseBefore} from 'routing-controllers';
import {InjectRepository} from 'typeorm-typedi-extensions';
import {Violation} from '../entity/Violation';
import {Repository} from 'typeorm';
import {TUserRole} from '../enums/user-role.enum';
import {AuthMiddleware} from '../auth/auth.middleware';

@JsonController('/violation')
export class ViolationController {

  constructor(@InjectRepository(Violation) private readonly violationRepository: Repository<Violation>) {
  }

  @Authorized([TUserRole.Read, TUserRole.Ghost, TUserRole.Write, TUserRole.Admin])
  @UseBefore(AuthMiddleware)
  @Get()
  getAllViolations(@QueryParam('page') page: number, @QueryParam('count') count: number): Promise<Violation[]> {
    return this.violationRepository.find({
      skip: page ? page * count : 0,
      take: count || 0,
      relations: ['car', 'record']
    });
  }
}
