import { Injectable } from '@nestjs/common';
import { CategoriesRepository } from './categories.repository';
import data from '../../Archivo actividad 3.json';

@Injectable()
export class CategoriesService {
  constructor(private readonly categoriesRepository: CategoriesRepository) {}

  async seedCategories() {
    const categoriesNames: string[] = [
      ...new Set(data.map((item) => item.category)),
    ];
    await this.categoriesRepository.addCategories(categoriesNames);
    return { message: 'Categories seeded successfully' };
  }
}
