import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from 'src/entities/product.entity';
import { FileUploadRepository } from './fileUpload.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class FileUploadService {
  constructor(
    private readonly fileUploadRepository: FileUploadRepository,
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>,
  ) {}

  async uploadImage(file: Express.Multer.File, productId: string) {
    const product = await this.productsRepository.findOneBy({ id: productId });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    const uploadedImage = await this.fileUploadRepository.uploadImage(file);
    console.log(uploadedImage.secure_url);
    await this.productsRepository.update(product.id, {
      imgUrl: uploadedImage.secure_url,
    });

    const updatedProduct = await this.productsRepository.findOneBy({
      id: product.id,
    });
    return updatedProduct;
  }
}
