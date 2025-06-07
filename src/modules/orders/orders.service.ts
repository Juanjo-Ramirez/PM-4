import { Injectable } from '@nestjs/common';
import { OrdersRepository } from './orders.repository';
import { Order } from 'src/entities/order.entity';
import { createOrderDto } from '../../dtos/createOrderDto';

@Injectable()
export class OrdersService {
  constructor(private readonly ordersRepository: OrdersRepository) {}

  async createOrder(createOrderDto: createOrderDto): Promise<Order> {
    const productIds = createOrderDto.products.map((product) => product.id);
    return this.ordersRepository.createOrder(createOrderDto.userId, productIds);
  }

  async findOrder(orderId: string): Promise<Order> {
    return this.ordersRepository.getOrder(orderId);
  }

  async retunrOrder(orderId: string) {
    return this.ordersRepository.retunOrder(orderId);
  }
}
