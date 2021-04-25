import {Entity, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import {Car} from './Car';
import {Record} from './Record';

@Entity()
export class Violation {

  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Car, car => car.violations)
  public car: Car;

  @ManyToOne(() => Record, record => record.violations)
  public record: Record;
}
