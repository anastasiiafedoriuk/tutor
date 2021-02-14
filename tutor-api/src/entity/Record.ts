import {Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {CameraPoint} from './CameraPoint';
import {Violation} from './Violation';
import {AverageSpeedViolation} from './AverageSpeedViolation';

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
  image: string;

  @CreateDateColumn({type: 'time'})
  created?: Date;

  @Column({type: 'boolean', default: false})
  singleViolationVerification: boolean;

  @Column({type: 'boolean', default: false})
  averageViolationVerification: boolean;

  @ManyToOne(() => CameraPoint, point => point.records)
  cameraPoint: CameraPoint;

  @OneToMany(() => Violation, violation => violation.record)
  violations: Violation[];

  @OneToMany(() => AverageSpeedViolation, violation => violation.startRecord)
  averageSpeedViolationStart: AverageSpeedViolation[];

  @OneToMany(() => AverageSpeedViolation, violation => violation.endRecord)
  averageSpeedViolationEnd: AverageSpeedViolation[];
}
