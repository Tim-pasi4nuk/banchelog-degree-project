import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Material } from './materials.entity';

@Entity('Product')
export class Product {
  @PrimaryGeneratedColumn('uuid', { name: 'product_id' })
  productId: string;

  @Column('varchar')
  name: string;

  @Column('varchar')
  description: string;

  @Column('int4')
  cost: number;

  @ManyToMany(() => Material, (material) => material.materialId, {
    nullable: true,
    cascade: true,
    onDelete: 'SET NULL',
  })
  @JoinTable({
    name: 'product_material_ids',
    joinColumn: {
      name: 'material_id',
    },
    inverseJoinColumn: {
      name: 'product_id',
    },
  })
  material: Material[];
}
