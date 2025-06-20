import { PickType } from '@nestjs/swagger';
import { CreateUserDto } from '../dtos/createUserDto';

export class LoginUserDto extends PickType(CreateUserDto, [
  'email',
  'password',
]) {}
