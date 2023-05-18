import { Worker } from './worker.entity';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Profile')
export class Profile {
  @PrimaryGeneratedColumn('uuid', { name: 'profile_id' })
  profileId: string;

  @Column('varchar', { name: 'first_name', nullable: false })
  firstName: string;

  @OneToOne(() => Worker, (worker) => worker.workerId)
  worker: Worker;
}
