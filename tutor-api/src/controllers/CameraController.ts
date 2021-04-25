import {
  Authorized,
  Delete,
  Get,
  JsonController,
  Param, Post,
  Put,
  QueryParam,
  UseBefore
} from 'routing-controllers';
import {Repository} from 'typeorm';
import {CameraPoint} from '../entity/CameraPoint';
import {InjectRepository} from 'typeorm-typedi-extensions';
import {TUserRole} from '../enums/user-role.enum';
import {AuthMiddleware} from '../auth/auth.middleware';
import {EntityFromBody, EntityFromParam} from 'typeorm-routing-controllers-extensions';
import {OpenAPI} from 'routing-controllers-openapi';

@OpenAPI({
  security: [{ bearerAuth: [] }],
})
@JsonController('/camera')
export class CameraController {

  constructor(@InjectRepository(CameraPoint) private readonly cameraPointRepository: Repository<CameraPoint>) {
  }

  @Authorized([TUserRole.Admin])
  @UseBefore(AuthMiddleware)
  @Get()
  getAllCameraPoint(@QueryParam('page') page: number , @QueryParam('count') count: number): Promise<CameraPoint[]> {
    return this.cameraPointRepository.find({
      skip: page ? page * count : 0,
      take: count || 0
    });
  }

  @Authorized([TUserRole.Admin])
  @UseBefore(AuthMiddleware)
  @Get('/:id')
  getCamera(@Param('id') id: number): Promise<CameraPoint> {
    return this.cameraPointRepository.findOneOrFail({
      where: {
        id
      }
    });
  }

  @Authorized([TUserRole.Admin])
  @UseBefore(AuthMiddleware)
  @Put()
  createCamera(@EntityFromBody() camera: CameraPoint): Promise<CameraPoint> {
    return this.cameraPointRepository.save(camera);
  }

  @Authorized([TUserRole.Admin])
  @UseBefore(AuthMiddleware)
  @Post('/:id')
  updateCamera(@Param('id') id: number, @EntityFromBody() camera: CameraPoint): Promise<CameraPoint> {
    try {
      return this.cameraPointRepository.save({id, ...camera});
    } catch (e) {
      console.log(e);
    }
  }

  @Authorized([TUserRole.Admin])
  @UseBefore(AuthMiddleware)
  @Delete('/:id')
  deleteCamera(@EntityFromParam('id') camera: CameraPoint): Promise<CameraPoint> {
    try {
      return this.cameraPointRepository.remove(camera);
    } catch (e) {
      console.log(e);
    }
  }
}
