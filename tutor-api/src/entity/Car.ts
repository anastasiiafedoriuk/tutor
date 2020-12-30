import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {Violation} from './Violation';

@Entity()
export class Car {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 10
  })
  plate: string;

  @OneToMany(() => Violation, violation => violation.car)
  violations: Violation[];
}
