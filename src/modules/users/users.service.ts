import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { User } from 'src/entities/user.entity';
import { ModifyUserDto } from 'src/dtos/modifyUserDto';
import { CreateUserDto } from 'src/dtos/createUserDto';
import { PaginationDto } from 'src/dtos/paginationDto';

@Injectable()
export class UsersService {
  constructor(private UserRepository: UsersRepository) {}

  async getUsers(paginationDto: PaginationDto) {
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

  async getUserById(id: string): Promise<ModifyUserDto> {
    return await this.UserRepository.getUserById(id);
  }

  async createUser(user: CreateUserDto): Promise<User> {
    return this.UserRepository.createUser(user);
  }

  async updateUser(
    id: string,
    userModify: Partial<ModifyUserDto>,
  ): Promise<User> {
    return this.UserRepository.updateUser(id, userModify);
  }

  async deleteUser(id: string): Promise<string> {
    return this.UserRepository.deleteUser(id);
  }

  async getUserByEmail(email: string): Promise<User | null> {
    return this.UserRepository.getUserByEmail(email);
  }
}
