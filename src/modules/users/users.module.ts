import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UsersRepository } from './users.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { cloudinaryConfig } from 'src/config/cloudinary';
import { FileUploadModule } from 'src/fileUpload/fileUpload.module';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [
    UsersService,
    UsersRepository,
    cloudinaryConfig,
    FileUploadModule,
  ],
})
export class UsersModule {}
