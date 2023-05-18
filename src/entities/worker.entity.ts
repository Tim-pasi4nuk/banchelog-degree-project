import { Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Profile } from './profile.entity';
import { Schedule } from './schedule.entity';

@Entity('Worker')
export class Worker {
  @PrimaryGeneratedColumn('uuid', { name: 'worker_id' })
  workerId: string;

  @OneToOne(() => Profile, (profile) => profile.profileId)
  profile: Profile;

  @OneToMany(() => Schedule, (schedule) => schedule.scheduleId)
  schedule: Schedule[];
}
