import {Column, Entity, PrimaryGeneratedColumn, Unique} from 'typeorm';
import {TUserRole} from '../enums/user-role.enum';

@Entity()
@Unique(['email'])
export class User {

  @PrimaryGeneratedColumn()
  id: string;

  @Column({
    type: 'varchar'
  })
  email: string;


  @Column({
    type: 'varchar'
  })
  password: string;

  @Column({
    type: 'simple-enum',
    default: TUserRole.Ghost
  })
  role: TUserRole;
}
