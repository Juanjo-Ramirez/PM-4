import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from 'src/dtos/createUserDto';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsOrder, Repository } from 'typeorm';
import { User } from 'src/entities/user.entity';
import { ModifyUserDto } from 'src/dtos/modifyUserDto';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async getUsers(): Promise<Omit<User, 'password'>[]> {
    const users = await this.usersRepository.find();
    return users.map(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      ({ password, ...userWithoutPassword }) => userWithoutPassword,
    );
  }
  async findAndCount(options: {
    skip: number;
    take: number;
    select: string[];
    order: { name: string };
  }): Promise<[User[], number]> {
    return this.usersRepository.findAndCount({
      skip: options.skip,
      take: options.take,
      select: options.select as (keyof User)[],
      order: options.order as FindOptionsOrder<User>,
    });
  }

  async getUserById(id: string): Promise<ModifyUserDto> {
    const user = await this.usersRepository.findOne({
      where: { id },
      relations: ['orders'],
    });
    if (!user) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    }
    const ordersSimplified = user.orders
      ? user.orders.map((order) => ({
          id: order.id,
          date: order.date,
        }))
      : [];
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userWithoutPassword } = user;
    return { ...userWithoutPassword, orders: ordersSimplified };
  }

  async getUserByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOne({ where: { email } });
  }

  async createUser(user: CreateUserDto): Promise<User> {
    const newUser = this.usersRepository.create(user);
    return this.usersRepository.save(newUser);
  }

  async updateUser(id: string, userModify: ModifyUserDto): Promise<User> {
    const userToUpdate = await this.usersRepository.findOne({ where: { id } });
    if (!userToUpdate) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    }
    Object.assign(userToUpdate, userModify);
    return this.usersRepository.save(userToUpdate);
  }

  async deleteUser(id: string): Promise<string> {
    const result = await this.usersRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    }
    return `Usuario con ID ${id} eliminado correctamente`;
  }
}
