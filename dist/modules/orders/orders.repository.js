"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdersRepository = void 0;
const common_1 = require("@nestjs/common");
const order_entity_1 = require("../../entities/order.entity");
const orderDetails_entity_1 = require("../../entities/orderDetails.entity");
const user_entity_1 = require("../../entities/user.entity");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const product_entity_1 = require("../../entities/product.entity");
let OrdersRepository = class OrdersRepository {
    ordersRepository;
    orderDetailsRepository;
    userRepository;
    productRepository;
    dataSource;
    constructor(ordersRepository, orderDetailsRepository, userRepository, productRepository, dataSource) {
        this.ordersRepository = ordersRepository;
        this.orderDetailsRepository = orderDetailsRepository;
        this.userRepository = userRepository;
        this.productRepository = productRepository;
        this.dataSource = dataSource;
    }
    async createOrder(userId, productsIds) {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const user = await this.userRepository.findOne({ where: { id: userId } });
            if (!user) {
                throw new common_1.NotFoundException('User not found');
            }
            const products = await this.productRepository.find({
                where: {
                    id: (0, typeorm_2.In)(productsIds),
                    stock: (0, typeorm_2.MoreThan)(0),
                },
            });
            if (products.length !== productsIds.length) {
                throw new common_1.NotFoundException('Products in stock not disponible');
            }
            const total = products.reduce((sum, product) => sum + Number(product.price), 0);
            for (const product of products) {
                product.stock -= 1;
                await queryRunner.manager.save(product);
            }
            const orderDetails = new orderDetails_entity_1.OrderDetails();
            orderDetails.total = total;
            orderDetails.products = products;
            const savedOrderDetails = await queryRunner.manager.save(orderDetails);
            const order = new order_entity_1.Order();
            order.user = user;
            order.orderDetails = savedOrderDetails;
            const savedOrder = await queryRunner.manager.save(order);
            await queryRunner.commitTransaction();
            return savedOrder;
        }
        catch (error) {
            await queryRunner.rollbackTransaction();
            throw error;
        }
        finally {
            await queryRunner.release();
        }
    }
    async getOrder(orderId) {
        const order = await this.ordersRepository.findOne({
            where: { id: orderId },
            relations: ['orderDetails', 'orderDetails.products', 'user'],
        });
        if (!order) {
            throw new common_1.NotFoundException('Order not found');
        }
        return order;
    }
    async retunOrder(orderId) {
        const order = await this.ordersRepository.findOne({
            where: { id: orderId },
            relations: ['orderDetails', 'orderDetails.products'],
        });
        if (!order) {
            throw new common_1.NotFoundException('Order not found');
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
};
exports.OrdersRepository = OrdersRepository;
exports.OrdersRepository = OrdersRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(order_entity_1.Order)),
    __param(1, (0, typeorm_1.InjectRepository)(orderDetails_entity_1.OrderDetails)),
    __param(2, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(3, (0, typeorm_1.InjectRepository)(product_entity_1.Product)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.DataSource])
], OrdersRepository);
//# sourceMappingURL=orders.repository.js.map