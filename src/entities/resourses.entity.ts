import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Resourses')
export class Resourses {
  @PrimaryGeneratedColumn('uuid', { name: 'resourses_id' })
  resoursesId: string;

  @Column('varchar')
  name: string;
}
