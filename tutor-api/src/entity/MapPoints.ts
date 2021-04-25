import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import {CameraPoint} from './CameraPoint';

@Entity()
export class MapPoints {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'int'
  })
  averageSpeed: number;

  @Column({
    type: 'int'
  })
  distance: number;

  @ManyToOne(() => CameraPoint, point => point.startPoints)
  startPoint: CameraPoint;

  @ManyToOne(() => CameraPoint, point => point.endPoints)
  endPoint: CameraPoint;
}
