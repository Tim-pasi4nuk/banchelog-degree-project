import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Product } from './product.entity';
import { Worker } from './worker.entity';
import { Instrument } from './instruments.entity';

@Entity('Factory')
export class Factory {
  @PrimaryGeneratedColumn('uuid', { name: 'factory_id' })
  factoryId: string;

  @Column('varchar')
  name: string;

  @ManyToMany(() => Product, (product) => product.productId, {
    nullable: true,
    cascade: true,
    onDelete: 'SET NULL',
  })
  @JoinTable({
    name: 'factory_product_ids',
    joinColumn: {
      name: 'factory_id',
    },
    inverseJoinColumn: {
      name: 'product_id',
    },
  })
  product?: Product[];

  @ManyToMany(() => Worker, (product) => product.workerId, {
    nullable: true,
    cascade: true,
    onDelete: 'SET NULL',
  })
  @JoinTable({
    name: 'factory_workers_ids',
    joinColumn: {
      name: 'factory_id',
    },
    inverseJoinColumn: {
      name: 'worker_id',
    },
  })
  worker?: Worker[];

  @ManyToMany(() => Instrument, (product) => product.instrumentId, {
    nullable: true,
    cascade: true,
    onDelete: 'SET NULL',
  })
  @JoinTable({
    name: 'factory_instruments_ids',
    joinColumn: {
      name: 'factory_id',
    },
    inverseJoinColumn: {
      name: 'instrument_id',
    },
  })
  instruments?: Instrument[];
}
