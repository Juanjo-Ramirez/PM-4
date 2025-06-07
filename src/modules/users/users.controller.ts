import {
  Controller,
  Get,
  Put,
  Delete,
  Param,
  HttpCode,
  Body,
  UseGuards,
  Query,
  ParseUUIDPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from 'src/entities/user.entity';
import { AuthGuard } from '../../guards/auth.guard';
import { ModifyUserDto } from 'src/dtos/modifyUserDto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { RolesGuard } from 'src/guards/roles.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/enums/role.enum';
import { PaginationDto } from 'src/dtos/paginationDto';

@ApiBearerAuth()
@Controller('users')
@UseGuards(AuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @HttpCode(200)
  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  getUsers(@Query() paginationDto: PaginationDto): Promise<{
    data: Omit<User, 'password'>[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  }> {
    return this.usersService.getUsers(paginationDto);
  }

  @Get(':id')
  @HttpCode(200)
  getUserById(@Param('id', ParseUUIDPipe) id: string): Promise<ModifyUserDto> {
    return this.usersService.getUserById(id);
  }

  // @Post('/register')
  // @HttpCode(201)
  // createUser(@Body() user: Omit<CreateUserDto, 'id'>): Promise<User> {
  //   return this.usersService.createUser(user);
  // }

  @Put('/update/:id')
  @HttpCode(201)
  updateUser(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() user: ModifyUserDto,
  ) {
    return this.usersService.updateUser(id, user);
  }

  @Delete(':id')
  deleteUser(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.deleteUser(id);
  }
}
