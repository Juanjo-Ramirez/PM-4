/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '../../entities/product.entity';
import { Repository } from 'typeorm';
import { ModifyProductDto } from 'src/dtos/modifyProductDto';
import { ProductsDto } from 'src/dtos/productDto';

@Injectable()
export class ProductsRepository {
  constructor(
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>,
  ) {}

  async getProducts() {
    return await this.productsRepository.find({ relations: ['categories'] });
  }

  async preloadProduct(product: Product): Promise<void> {
    const existingProduct = await this.productsRepository.findOne({
      where: { name: product.name },
    });
    if (!existingProduct) {
      await this.productsRepository.save({
        ...product,
      });
    }
  }

  async getProductById(id: string) {
    const product = await this.productsRepository.findOne({
      where: { id },
      relations: ['categories'],
    });
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return product;
  }

  async createProduct(product: Partial<ProductsDto>) {
    const existingProduct = await this.productsRepository.findOne({
      where: { name: product.name },
    });
    if (existingProduct) {
      throw new NotFoundException(
        `Product with name ${product.name} already exists`,
      );
    }
    const newProduct = this.productsRepository.create({
      ...product,
      categories: product.categories ? product.categories : null,
    });
    return await this.productsRepository.save(newProduct);
  }

  async updateProduct(id: string, product: ModifyProductDto) {
    const productToUpdate = await this.productsRepository.findOne({
      where: { id },
    });
    if (!productToUpdate) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    Object.assign(productToUpdate, product);
    await this.productsRepository.save(productToUpdate);
    return productToUpdate;
  }

  async deleteProduct(id: string) {
    const product = await this.productsRepository.findOne({
      where: { id },
    });
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    await this.productsRepository.remove(product);
    return `Product with ID ${id} deleted successfully`;
  }
}
