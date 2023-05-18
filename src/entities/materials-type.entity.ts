import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Materials-type')
export class MaterialType {
  @PrimaryGeneratedColumn('uuid', { name: 'materials_type_id' })
  materialTypeId: string;

  @Column('varchar')
  name: string;
}
