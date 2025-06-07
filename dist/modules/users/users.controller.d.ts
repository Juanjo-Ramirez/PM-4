import { UsersService } from './users.service';
import { User } from 'src/entities/user.entity';
import { ModifyUserDto } from 'src/dtos/modifyUserDto';
import { PaginationDto } from 'src/dtos/paginationDto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    getUsers(paginationDto: PaginationDto): Promise<{
        data: Omit<User, 'password'>[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }>;
    getUserById(id: string): Promise<ModifyUserDto>;
    updateUser(id: string, user: ModifyUserDto): Promise<User>;
    deleteUser(id: string): Promise<string>;
}
