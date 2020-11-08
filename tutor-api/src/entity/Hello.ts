import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class Hello {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 100
  })
  title: string;
}
