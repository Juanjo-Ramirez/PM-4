import { Injectable, NotFoundException } from '@nestjs/common';
import { Order } from 'src/entities/order.entity';
import { OrderDetails } from 'src/entities/orderDetails.entity';
import { User } from 'src/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, In, MoreThan, Repository } from 'typeorm';
import { Product } from 'src/entities/product.entity';

@Injectable()
export class OrdersRepository {
  constructor(
    @InjectRepository(Order)
    private readonly ordersRepository: Repository<Order>,
    @InjectRepository(OrderDetails)
    private readonly orderDetailsRepository: Repository<OrderDetails>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    private dataSource: DataSource,
  ) {}

  async createOrder(userId: string, productsIds: string[]): Promise<Order> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const user = await this.userRepository.findOne({ where: { id: userId } });
      if (!user) {
        throw new NotFoundException('User not found');
      }

      const products = await this.productRepository.find({
        where: {
          id: In(productsIds),
          stock: MoreThan(0),
        },
      });

      if (products.length !== productsIds.length) {
        throw new NotFoundException('Products in stock not disponible');
      }

      const total = products.reduce(
        (sum, product) => sum + Number(product.price),
        0,
      );
      for (const product of products) {
        product.stock -= 1;
        await queryRunner.manager.save(product);
      }

      const orderDetails = new OrderDetails();
      orderDetails.total = total;
      orderDetails.products = products;
      const savedOrderDetails = await queryRunner.manager.save(orderDetails);

      const order = new Order();
      order.user = user;
      order.orderDetails = savedOrderDetails;
      const savedOrder = await queryRunner.manager.save(order);

      await queryRunner.commitTransaction();
      return savedOrder;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
  async getOrder(orderId: string): Promise<Order> {
    const order = await this.ordersRepository.findOne({
      where: { id: orderId },
      relations: ['orderDetails', 'orderDetails.products', 'user'],
    });
    if (!order) {
      throw new NotFoundException('Order not found');
    }
    return order;
  }

  async retunOrder(orderId: string) {
    const order = await this.ordersRepository.findOne({
      where: { id: orderId },
      relations: ['orderDetails', 'orderDetails.products'],
    });
    if (!order) {
      throw new NotFoundException('Order not found');
    }
    const orderDetails = order.orderDetails;
    if (orderDetails) {
      for (const product of orderDetails.products) {
        const productToUpdate = await this.productRepository.findOne({
          where: { id: product.id },
        });
        if (productToUpdate) {
          productToUpdate.stock += 1;
          await this.productRepository.save(productToUpdate);
        }
      }
    }
    await this.ordersRepository.remove(order);
  }
}
