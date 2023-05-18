import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Resourses } from './resourses.entity';

@Entity('Instrument')
export class Instrument {
  @PrimaryGeneratedColumn('uuid', { name: 'instrument_id' })
  instrumentId: string;

  @Column('varchar')
  name: string;

  @ManyToMany(() => Resourses, (materialType) => materialType.resoursesId, {
    nullable: true,
    cascade: true,
    onDelete: 'SET NULL',
  })
  @JoinTable({
    name: 'resourses_instruments_ids',
    joinColumn: {
      name: 'instruments_id',
    },
    inverseJoinColumn: {
      name: 'resourses_id',
    },
  })
  resourses?: Resourses[];
}
