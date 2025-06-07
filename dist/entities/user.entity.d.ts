import { Order } from '../entities/order.entity';
import { Role } from 'src/enums/role.enum';
export declare class User {
    id: string;
    name: string;
    email: string;
    password: string;
    phone: number;
    country: string;
    city: string;
    address: string;
    role: Role;
    orders: Order[];
}
