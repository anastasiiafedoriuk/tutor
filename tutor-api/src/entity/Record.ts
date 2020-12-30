import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {CameraPoint} from './CameraPoint';
import {Violation} from './Violation';

@Entity()
export class Record {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 10
  })
  plate: string;

  @Column({
    type: 'int'
  })
  speed: number;

  @Column({
    type: 'varchar',
    length: 100
  })
  image: number;

  @ManyToOne(() => CameraPoint, point => point.records)
  cameraPoint: CameraPoint;

  @OneToMany(() => Violation, violation => violation.record)
  violations: Violation[];
}
