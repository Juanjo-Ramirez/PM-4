import { Repository } from 'typeorm';
import { Categories } from '../../entities/category.entity';
export declare class CategoriesRepository {
    private readonly categoriesRepository;
    constructor(categoriesRepository: Repository<Categories>);
    getCategories(): Promise<Categories[]>;
    addCategories(categories: string[]): Promise<void>;
}
