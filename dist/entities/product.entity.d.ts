import { Categories } from './category.entity';
import { OrderDetails } from './orderDetails.entity';
export declare class Product {
    id: string;
    name: string;
    description: string;
    price: number;
    stock: number;
    imgUrl: string;
    categories?: Categories;
    orderDetails: OrderDetails[];
}
