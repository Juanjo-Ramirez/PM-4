import { Order } from 'src/entities/order.entity';
import { OrderDetails } from 'src/entities/orderDetails.entity';
import { User } from 'src/entities/user.entity';
import { DataSource, Repository } from 'typeorm';
import { Product } from 'src/entities/product.entity';
export declare class OrdersRepository {
    private readonly ordersRepository;
    private readonly orderDetailsRepository;
    private readonly userRepository;
    private readonly productRepository;
    private dataSource;
    constructor(ordersRepository: Repository<Order>, orderDetailsRepository: Repository<OrderDetails>, userRepository: Repository<User>, productRepository: Repository<Product>, dataSource: DataSource);
    createOrder(userId: string, productsIds: string[]): Promise<Order>;
    getOrder(orderId: string): Promise<Order>;
    retunOrder(orderId: string): Promise<void>;
}
