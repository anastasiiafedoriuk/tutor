import {Authorized, Delete, Get, JsonController, Param, Post, Put, QueryParam, UseBefore} from 'routing-controllers';
import {InjectRepository} from 'typeorm-typedi-extensions';
import {Repository} from 'typeorm';
import {TUserRole} from '../enums/user-role.enum';
import {AuthMiddleware} from '../auth/auth.middleware';
import {EntityFromBody, EntityFromParam} from 'typeorm-routing-controllers-extensions';
import {MapPoints} from '../entity/MapPoints';

@JsonController('/map')
export class MapController {
  constructor(@InjectRepository(MapPoints) private readonly mapPointsRepository: Repository<MapPoints>) {
  }

  @Authorized([TUserRole.Admin, TUserRole.Read])
  @UseBefore(AuthMiddleware)
  @Get()
  getAllMapPoints(@QueryParam('page') page = 0, @QueryParam('count') count = 10): Promise<MapPoints[]> {
    return this.mapPointsRepository.find({
      skip: page * count,
      take: count,
      join: {
        alias: 'point',
        leftJoinAndSelect: {
          startPoint: 'point.startPoint',
          endPoint: 'point.endPoint'
        }
      }
    });
  }

  @Authorized([TUserRole.Admin, TUserRole.Read])
  @UseBefore(AuthMiddleware)
  @Get('/:id')
  getMapPoint(@Param('id') id: number): Promise<MapPoints> {
    return this.mapPointsRepository.findOneOrFail({
      where: {
        id
      }
    });
  }

  @Authorized([TUserRole.Admin])
  @UseBefore(AuthMiddleware)
  @Put()
  createCamera(@EntityFromBody() mapPoints: MapPoints): Promise<MapPoints> {
    console.log(mapPoints.startPoint);
    return this.mapPointsRepository.save(mapPoints);
  }

  @Authorized([TUserRole.Admin])
  @UseBefore(AuthMiddleware)
  @Post('/:id')
  updateCamera(@Param('id') id: number, @EntityFromBody() mapPoint: MapPoints): Promise<MapPoints> {
    try {
      return this.mapPointsRepository.save({id, ...mapPoint});
    } catch (e) {
      console.log(e);
    }
  }

  @Authorized([TUserRole.Admin])
  @UseBefore(AuthMiddleware)
  @Delete('/:id')
  deleteMapPoint(@EntityFromParam('id') mapPoint: MapPoints): Promise<MapPoints> {
    try {
      return this.mapPointsRepository.remove(mapPoint);
    } catch (e) {
      console.log(e);
    }
  }
}
