import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginUserDto } from '../../dtos/loginUserDto';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/dtos/createUserDto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { Role } from 'src/enums/role.enum';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async singup(user: Omit<CreateUserDto, 'confirmPassword'>) {
    const { email, password } = user;
    const userExist = await this.usersRepository.findOne({
      where: { email },
    });

    if (userExist) {
      throw new BadRequestException('Email ya registrado');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await this.usersRepository.save({
      ...user,
      password: hashedPassword,
    });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: newUserPassword, ...userWithoutPassword } = newUser;
    return userWithoutPassword;
  }

  async signin({ email, password }: LoginUserDto) {
    const user = await this.usersService.getUserByEmail(email);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Credenciales inválidas');
    }
    const jwtPayload = {
      userId: user.id,
      email: user.email,
      role: user.role,
    };

    const token = this.jwtService.sign(jwtPayload);
    return { success: 'Login successfully', token };
  }

  async createAdmin(user: Omit<CreateUserDto, 'confirmPassword'>) {
    const { email, password } = user;
    const userExist = await this.usersRepository.findOne({
      where: { email },
    });

    if (userExist) {
      throw new BadRequestException('Email ya registrado');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await this.usersRepository.save({
      ...user,
      password: hashedPassword,
      role: Role.ADMIN,
    });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: newUserPassword, ...userWithoutPassword } = newUser;
    return userWithoutPassword;
  }
}
