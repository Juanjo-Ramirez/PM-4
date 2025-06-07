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
exports.UsersRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("../../entities/user.entity");
let UsersRepository = class UsersRepository {
    usersRepository;
    constructor(usersRepository) {
        this.usersRepository = usersRepository;
    }
    async getUsers() {
        const users = await this.usersRepository.find();
        return users.map(({ password, ...userWithoutPassword }) => userWithoutPassword);
    }
    async findAndCount(options) {
        return this.usersRepository.findAndCount({
            skip: options.skip,
            take: options.take,
            select: options.select,
            order: options.order,
        });
    }
    async getUserById(id) {
        const user = await this.usersRepository.findOne({
            where: { id },
            relations: ['orders'],
        });
        if (!user) {
            throw new common_1.NotFoundException(`Usuario con ID ${id} no encontrado`);
        }
        const ordersSimplified = user.orders
            ? user.orders.map((order) => ({
                id: order.id,
                date: order.date,
            }))
            : [];
        const { password, ...userWithoutPassword } = user;
        return { ...userWithoutPassword, orders: ordersSimplified };
    }
    async getUserByEmail(email) {
        return this.usersRepository.findOne({ where: { email } });
    }
    async createUser(user) {
        const newUser = this.usersRepository.create(user);
        return this.usersRepository.save(newUser);
    }
    async updateUser(id, userModify) {
        const userToUpdate = await this.usersRepository.findOne({ where: { id } });
        if (!userToUpdate) {
            throw new common_1.NotFoundException(`Usuario con ID ${id} no encontrado`);
        }
        Object.assign(userToUpdate, userModify);
        return this.usersRepository.save(userToUpdate);
    }
    async deleteUser(id) {
        const result = await this.usersRepository.delete(id);
        if (result.affected === 0) {
            throw new common_1.NotFoundException(`Usuario con ID ${id} no encontrado`);
        }
        return `Usuario con ID ${id} eliminado correctamente`;
    }
};
exports.UsersRepository = UsersRepository;
exports.UsersRepository = UsersRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UsersRepository);
//# sourceMappingURL=users.repository.js.map