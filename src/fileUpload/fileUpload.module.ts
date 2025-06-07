import { Module } from '@nestjs/common';
import { FileUploadController } from './fileUpload.controller';
import { FileUploadService } from './fileUpload.service';
import { FileUploadRepository } from './fileUpload.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/entities/product.entity';
import { cloudinaryConfig } from 'src/config/cloudinary';

@Module({
  imports: [TypeOrmModule.forFeature([Product])],
  controllers: [FileUploadController],
  providers: [
    FileUploadService,
    FileUploadRepository,
    cloudinaryConfig,
    FileUploadRepository,
  ],
})
export class FileUploadModule {}
