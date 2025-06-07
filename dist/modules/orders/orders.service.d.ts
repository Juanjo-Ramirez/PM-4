import { OrdersRepository } from './orders.repository';
import { Order } from 'src/entities/order.entity';
import { createOrderDto } from '../../dtos/createOrderDto';
export declare class OrdersService {
    private readonly ordersRepository;
    constructor(ordersRepository: OrdersRepository);
    createOrder(createOrderDto: createOrderDto): Promise<Order>;
    findOrder(orderId: string): Promise<Order>;
    retunrOrder(orderId: string): Promise<void>;
}
