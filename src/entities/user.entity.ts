import { Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Factory } from './factory.entity';

@Entity('User')
export class User {
  @PrimaryGeneratedColumn('uuid', { name: 'profile_id' })
  userId: string;

  @OneToMany(() => Factory, (factory) => factory.factoryId)
  factory: Factory[];
}
