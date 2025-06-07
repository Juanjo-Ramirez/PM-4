"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const users_service_1 = require("../users/users.service");
const bcrypt = __importStar(require("bcrypt"));
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("../../entities/user.entity");
const typeorm_2 = require("typeorm");
const role_enum_1 = require("../../enums/role.enum");
let AuthService = class AuthService {
    usersService;
    jwtService;
    usersRepository;
    constructor(usersService, jwtService, usersRepository) {
        this.usersService = usersService;
        this.jwtService = jwtService;
        this.usersRepository = usersRepository;
    }
    async singup(user) {
        const { email, password } = user;
        const userExist = await this.usersRepository.findOne({
            where: { email },
        });
        if (userExist) {
            throw new common_1.BadRequestException('Email ya registrado');
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await this.usersRepository.save({
            ...user,
            password: hashedPassword,
        });
        const { password: newUserPassword, ...userWithoutPassword } = newUser;
        return userWithoutPassword;
    }
    async signin({ email, password }) {
        const user = await this.usersService.getUserByEmail(email);
        if (!user || !(await bcrypt.compare(password, user.password))) {
            throw new common_1.UnauthorizedException('Credenciales inválidas');
        }
        const jwtPayload = {
            userId: user.id,
            email: user.email,
            role: user.role,
        };
        const token = this.jwtService.sign(jwtPayload);
        return { success: 'Login successfully', token };
    }
    async createAdmin(user) {
        const { email, password } = user;
        const userExist = await this.usersRepository.findOne({
            where: { email },
        });
        if (userExist) {
            throw new common_1.BadRequestException('Email ya registrado');
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await this.usersRepository.save({
            ...user,
            password: hashedPassword,
            role: role_enum_1.Role.ADMIN,
        });
        const { password: newUserPassword, ...userWithoutPassword } = newUser;
        return userWithoutPassword;
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(2, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        jwt_1.JwtService,
        typeorm_2.Repository])
], AuthService);
//# sourceMappingURL=auth.service.js.map