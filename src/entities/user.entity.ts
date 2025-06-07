import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Order } from '../entities/order.entity';
import { Role } from 'src/enums/role.enum';

@Entity({
  name: 'users',
})
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid();

  @Column({ type: 'varchar', length: 50, nullable: false })
  name: string;

  @Column({ type: 'varchar', length: 50, nullable: false })
  email: string;

  @Column({ type: 'varchar', length: 80, nullable: false })
  password: string;

  @Column({ type: 'int', nullable: true })
  phone: number;

  @Column({ type: 'varchar', length: 50, nullable: true })
  country: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  city: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  address: string;

  @Column({ type: 'enum', enum: Role, default: Role.USER })
  role: Role;

  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];
}
