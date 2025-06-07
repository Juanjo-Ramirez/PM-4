import { Order } from './order.entity';
import { Product } from './product.entity';
export declare class OrderDetails {
    id: string;
    total: number;
    order: Order;
    products: Product[];
}
