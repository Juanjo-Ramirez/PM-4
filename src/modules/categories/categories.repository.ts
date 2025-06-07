import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Categories } from '../../entities/category.entity';

@Injectable()
export class CategoriesRepository {
  constructor(
    @InjectRepository(Categories)
    private readonly categoriesRepository: Repository<Categories>,
  ) {}
  async getCategories(): Promise<Categories[]> {
    return await this.categoriesRepository.find({ relations: ['products'] });
  }

  async addCategories(categories: string[]): Promise<void> {
    for (const name of categories) {
      const existingCategory = await this.categoriesRepository.findOne({
        where: { name },
      });
      if (!existingCategory) {
        await this.categoriesRepository.save({
          name,
        });
      }
    }
  }
}
