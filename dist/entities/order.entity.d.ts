import { User } from './user.entity';
import { OrderDetails } from './orderDetails.entity';
export declare class Order {
    id: string;
    user: User;
    date: Date;
    orderDetails: OrderDetails;
}
