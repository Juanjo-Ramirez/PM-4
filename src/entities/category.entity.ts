import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Product } from './product.entity';
import { v4 as uuid } from 'uuid';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Categories Entity')
@Entity({
  name: 'categories',
})
export class Categories {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid();

  @Column({ type: 'varchar', length: 50, nullable: false, unique: true })
  name: string;

  @OneToMany(() => Product, (product) => product.categories)
  products: Product[];
}
