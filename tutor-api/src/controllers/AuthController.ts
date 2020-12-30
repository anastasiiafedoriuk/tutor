import {JwtService} from '../services/jwt.service';
import {throwError} from 'rxjs';
import {User} from '../entity/User';
import {catchError, map, switchMap} from 'rxjs/operators';
import {Body, JsonController, Post, UnauthorizedError} from 'routing-controllers';
import {UserRepository} from '../repository/user.repository';
import {InjectRepository} from 'typeorm-typedi-extensions/decorators/InjectRepository';

@JsonController('/auth')
export class AuthController {

  constructor(@InjectRepository(UserRepository) private readonly userRepository: UserRepository,
              private readonly jwtService: JwtService) {
  }

  // @Post('/register')
  // register(@Body() user: UserRegisterPayload, @HeaderParam('app') app: TApplication): Promise<IUserResponse> {
  //   return of(this.userMapper.toEntity(user, app, true))
  //     .pipe(switchMap((user) => this.userRepository.findRegistered(user)))
  //     .pipe(switchMap((user) => fromPromise(this.userRepository.save(user))))
  //     .pipe(map<User, IUserResponse>(user => this.userMapper.toResponse(user)))
  //     .toPromise();
  // }

  @Post('/login')
  async login(@Body() params: User): Promise<Partial<User> & Record<'token', string>> {
    return this.userRepository.getByEmail(params.email)
      .pipe(catchError(() => throwError(new UnauthorizedError())))
      .pipe(switchMap(user => this.jwtService.checkPassword(params.password, user)))
      .pipe(map(user => ({...user, token: this.jwtService.generateJwt(user)})))
      .toPromise();
  }
}
