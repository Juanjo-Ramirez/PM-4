import { OrdersService } from './orders.service';
import { createOrderDto } from '../../dtos/createOrderDto';
export declare class OrdersController {
    private readonly ordersService;
    constructor(ordersService: OrdersService);
    createOrder(createOrderDto: createOrderDto): Promise<import("../../entities/order.entity").Order>;
    getOrder(orderId: string): Promise<import("../../entities/order.entity").Order>;
    returnOrder(orderId: string): Promise<void>;
}
