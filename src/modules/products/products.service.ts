import { Injectable } from '@nestjs/common';
import { ProductsRepository } from './products.repository';
import { CategoriesRepository } from '../categories/categories.repository';
import data from '../../Archivo actividad 3.json';
import { Categories } from 'src/entities/category.entity';
import { ProductsDto } from 'src/dtos/productDto';
import { ModifyProductDto } from 'src/dtos/modifyProductDto';

@Injectable()
export class ProductsService {
  constructor(
    private productsRepository: ProductsRepository,
    private categoriesRepository: CategoriesRepository,
  ) {}

  getProducts() {
    return this.productsRepository.getProducts();
  }

  getProductById(id: string) {
    const product = this.productsRepository.getProductById(id);
    return product;
  }

  createProduct(product: ProductsDto) {
    return this.productsRepository.createProduct(product);
  }

  updateProduct(id: string, product: ModifyProductDto) {
    return this.productsRepository.updateProduct(id, product);
  }

  async productsSeeder() {
    const categories = await this.categoriesRepository.getCategories();
    const categoryMap = new Map<string, Categories>();
    categories.forEach((category) => {
      categoryMap.set(category.name, category);
    });

    for (const item of data) {
      const category = categoryMap.get(item.category);
      if (!category) {
        throw new Error(`Category ${item.category} not found`);
      }
      await this.productsRepository.createProduct({
        name: item.name,
        description: item.description,
        price: item.price,
        stock: item.stock,
        categories: category,
      });
    }
    return { message: 'Products seeded successfully' };
  }
}
