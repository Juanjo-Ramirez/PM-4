import { UsersRepository } from './users.repository';
import { User } from 'src/entities/user.entity';
import { ModifyUserDto } from 'src/dtos/modifyUserDto';
import { CreateUserDto } from 'src/dtos/createUserDto';
import { PaginationDto } from 'src/dtos/paginationDto';
export declare class UsersService {
    private UserRepository;
    constructor(UserRepository: UsersRepository);
    getUsers(paginationDto: PaginationDto): Promise<{
        data: User[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }>;
    getUserById(id: string): Promise<ModifyUserDto>;
    createUser(user: CreateUserDto): Promise<User>;
    updateUser(id: string, userModify: Partial<ModifyUserDto>): Promise<User>;
    deleteUser(id: string): Promise<string>;
    getUserByEmail(email: string): Promise<User | null>;
}
