import {Entity, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import {Car} from './Car';
import {Record} from './Record';

@Entity()
export class AverageSpeedViolation {

  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Car, car => car.averageSpeedViolations)
  public car: Car;

  @ManyToOne(() => Record, record => record.averageSpeedViolationStart)
  public startRecord: Record;

  @ManyToOne(() => Record, record => record.averageSpeedViolationEnd)
  public endRecord: Record;
}
