import {Authorized, Delete, Get, JsonController, Param, Put, QueryParam, UseBefore} from 'routing-controllers';
import {Record} from '../entity/Record';
import {InjectRepository} from 'typeorm-typedi-extensions';
import {DeleteResult, Repository} from 'typeorm';
import {TUserRole} from '../enums/user-role.enum';
import {AuthMiddleware} from '../auth/auth.middleware';
import {EntityFromBody} from 'typeorm-routing-controllers-extensions';

@JsonController('/record')
export class RecordController {

  constructor(@InjectRepository(Record) private readonly recordRepository: Repository<Record>) {
  }

  @Authorized([TUserRole.Admin, TUserRole.Read])
  @UseBefore(AuthMiddleware)
  @Get()
  getAllRecords(@QueryParam('page') page: number, @QueryParam('count') count: number): Promise<Record[]> {
    return this.recordRepository.find({
      skip: page ? page * count : 0,
      take: count || 0,
      relations: ['cameraPoint']
    });
  }

  @Authorized([TUserRole.Admin, TUserRole.Read])
  @UseBefore(AuthMiddleware)
  @Get('/:id')
  getRecordById(@Param('id') id: number): Promise<Record> {
    return this.recordRepository.findOne({
      where: {
        id
      }
    });
  }

  @Authorized([TUserRole.Write, TUserRole.Admin])
  @UseBefore(AuthMiddleware)
  @Put()
  saveRecord(@EntityFromBody() record: Record): Promise<Record> {
    return this.recordRepository.save(record);
  }

  @Authorized([TUserRole.Admin])
  @UseBefore(AuthMiddleware)
  @Delete('/:id')
  deleteRecord(@Param('id') id: number): Promise<DeleteResult> {
    return this.recordRepository.delete(id);
  }
}
