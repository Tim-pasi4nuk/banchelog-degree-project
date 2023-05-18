import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { MaterialType } from './materials-type.entity';

@Entity('Material')
export class Material {
  @PrimaryGeneratedColumn('uuid', { name: 'material_id' })
  materialId: string;

  @Column('varchar')
  name: string;

  @Column('int4')
  amount: number;

  @ManyToMany(
    () => MaterialType,
    (materialType) => materialType.materialTypeId,
    {
      nullable: true,
      cascade: true,
      onDelete: 'SET NULL',
    },
  )
  @JoinTable({
    name: 'material_type_material_ids',
    joinColumn: {
      name: 'material_type_id',
    },
    inverseJoinColumn: {
      name: 'material_id',
    },
  })
  materialType?: MaterialType[];
}
