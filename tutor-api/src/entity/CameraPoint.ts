import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {Record} from './Record';
import {MapPoints} from './MapPoints';

@Entity()
export class CameraPoint {

  @PrimaryGeneratedColumn()
  id: string;

  @Column({
    type: 'float'
  })
  latitude: number;

  @Column({
    type: 'float'
  })
  longitude: number;

  @Column({
    type: 'varchar',
    length: 200
  })
  mapLink: string;

  @Column({
    type: 'int'
  })
  speed: number;

  @OneToMany(() => Record, record => record.cameraPoint)
  records: Record[];

  @OneToMany(() => MapPoints, record => record.startPoint)
  startPoints: MapPoints[];

  @OneToMany(() => MapPoints, record => record.endPoint)
  endPoints: MapPoints[];
}
