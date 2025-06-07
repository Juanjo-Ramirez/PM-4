import { LoginUserDto } from '../../dtos/loginUserDto';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from 'src/dtos/createUserDto';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { Role } from 'src/enums/role.enum';
export declare class AuthService {
    private readonly usersService;
    private readonly jwtService;
    private readonly usersRepository;
    constructor(usersService: UsersService, jwtService: JwtService, usersRepository: Repository<User>);
    singup(user: Omit<CreateUserDto, 'confirmPassword'>): Promise<{
        name: string;
        email: string;
        address: string;
        phone: number;
        country: string;
        city: string;
        id: string;
        role: Role;
        orders: import("../../entities/order.entity").Order[];
    }>;
    signin({ email, password }: LoginUserDto): Promise<{
        success: string;
        token: string;
    }>;
    createAdmin(user: Omit<CreateUserDto, 'confirmPassword'>): Promise<{
        role: Role.ADMIN;
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
