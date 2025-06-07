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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const users_repository_1 = require("./users.repository");
let UsersService = class UsersService {
    UserRepository;
    constructor(UserRepository) {
        this.UserRepository = UserRepository;
    }
    async getUsers(paginationDto) {
        const { page = 1, limit = 10 } = paginationDto;
        const skip = (page - 1) * limit;
        const [users, total] = await this.UserRepository.findAndCount({
            skip,
            take: limit,
            select: [
                'id',
                'name',
                'email',
                'phone',
                'country',
                'city',
                'address',
                'role',
            ],
            order: { name: 'ASC' },
        });
        const totalPages = Math.ceil(total / limit);
        return {
            data: users,
            total,
            page,
            limit,
            totalPages,
        };
    }
    async getUserById(id) {
        return await this.UserRepository.getUserById(id);
    }
    async createUser(user) {
        return this.UserRepository.createUser(user);
    }
    async updateUser(id, userModify) {
        return this.UserRepository.updateUser(id, userModify);
    }
    async deleteUser(id) {
        return this.UserRepository.deleteUser(id);
    }
    async getUserByEmail(email) {
        return this.UserRepository.getUserByEmail(email);
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_repository_1.UsersRepository])
], UsersService);
//# sourceMappingURL=users.service.js.map