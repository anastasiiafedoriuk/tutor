import {getRepository, MigrationInterface} from 'typeorm';
import {User} from '../entity/User';
import {TUserRole} from '../enums/user-role.enum';
import {JwtService} from '../services/jwt.service';
import {Service} from 'typedi';

@Service()
export class AdminUser1605267794261 implements MigrationInterface {

  constructor(private readonly jwtService: JwtService) {
  }

  public async up(): Promise<void> {
    const user: User = new User();
    user.email = 'admin@admin.com';
    user.role = TUserRole.Admin;
    user.password = this.jwtService.hash('admin123');
    await getRepository('user').save(user);
  }

  public async down(): Promise<void> {
  }

}
