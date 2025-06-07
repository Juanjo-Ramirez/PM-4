import { ProductsRepository } from './products.repository';
import { CategoriesRepository } from '../categories/categories.repository';
import { ProductsDto } from 'src/dtos/productDto';
import { ModifyProductDto } from 'src/dtos/modifyProductDto';
export declare class ProductsService {
    private productsRepository;
    private categoriesRepository;
    constructor(productsRepository: ProductsRepository, categoriesRepository: CategoriesRepository);
    getProducts(): Promise<import("../../entities/product.entity").Product[]>;
    getProductById(id: string): Promise<import("../../entities/product.entity").Product>;
    createProduct(product: ProductsDto): Promise<import("../../entities/product.entity").Product>;
    updateProduct(id: string, product: ModifyProductDto): Promise<import("../../entities/product.entity").Product>;
    productsSeeder(): Promise<{
        message: string;
    }>;
}
