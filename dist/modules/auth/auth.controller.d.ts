import { AuthService } from './auth.service';
import { LoginUserDto } from '../../dtos/loginUserDto';
import { CreateUserDto } from 'src/dtos/createUserDto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    signup(createUserDto: CreateUserDto): Promise<{
        name: string;
        email: string;
        address: string;
        phone: number;
        country: string;
        city: string;
        id: string;
        role: import("../../enums/role.enum").Role;
        orders: import("../../entities/order.entity").Order[];
    }>;
    signin(loginUserDto: LoginUserDto): Promise<{
        success: string;
        token: string;
    }>;
    createAdmin(createUserDto: CreateUserDto): Promise<{
        role: import("../../enums/role.enum").Role.ADMIN;
        name: string;
        email: string;
        address: string;
        phone: number;
        country: string;
        city: string;
        id: string;
        orders: import("../../entities/order.entity").Order[];
    }>;
}
