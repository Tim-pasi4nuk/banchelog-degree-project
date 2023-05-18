import { Worker } from './worker.entity';
import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Schedule')
export class Schedule {
  @PrimaryGeneratedColumn('uuid', { name: 'profile_id' })
  scheduleId: string;

  @ManyToOne(() => Worker, (worker) => worker.workerId)
  worker: Worker;
}
