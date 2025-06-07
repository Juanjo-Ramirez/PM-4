import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './createUserDto';

export class ModifyUserDto extends PartialType(CreateUserDto) {
  orders?: { id: string; date: Date }[];
}
