import { Controller, Post, Body, HttpCode } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from '../../dtos/loginUserDto';
import { CreateUserDto } from 'src/dtos/createUserDto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('User creation (SignUP) and user login (SignIn)')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @HttpCode(201)
  @ApiResponse({
    status: 201,
    description: 'User created successfully',
  })
  @ApiOperation({
    summary:
      'User Creation (email, password, name, phone, country, city, address)',
  })
  async signup(@Body() createUserDto: CreateUserDto) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { confirmPassword, ...userWithoutConfirmPassword } = createUserDto;
    return await this.authService.singup(userWithoutConfirmPassword);
  }

  @Post('signin')
  @ApiOperation({ summary: 'User Login (email and  password)' })
  signin(@Body() loginUserDto: LoginUserDto) {
    return this.authService.signin(loginUserDto);
  }

  @Post('create-admin')
  @HttpCode(201)
  @ApiResponse({
    status: 201,
    description: 'Admin created successfully',
  })
  @ApiOperation({
    summary:
      'Admin creation (email, password, name, phone, country, city, address)',
  })
  async createAdmin(@Body() createUserDto: CreateUserDto) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { confirmPassword, ...userWithoutConfirmPassword } = createUserDto;
    return await this.authService.createAdmin(userWithoutConfirmPassword);
  }
}
