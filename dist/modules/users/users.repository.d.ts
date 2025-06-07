import { CreateUserDto } from 'src/dtos/createUserDto';
import { Repository } from 'typeorm';
import { User } from 'src/entities/user.entity';
import { ModifyUserDto } from 'src/dtos/modifyUserDto';
export declare class UsersRepository {
    private readonly usersRepository;
    constructor(usersRepository: Repository<User>);
    getUsers(): Promise<Omit<User, 'password'>[]>;
    findAndCount(options: {
        skip: number;
        take: number;
        select: string[];
        order: {
            name: string;
        };
    }): Promise<[User[], number]>;
    getUserById(id: string): Promise<ModifyUserDto>;
    getUserByEmail(email: string): Promise<User | null>;
    createUser(user: CreateUserDto): Promise<User>;
    updateUser(id: string, userModify: ModifyUserDto): Promise<User>;
    deleteUser(id: string): Promise<string>;
}
