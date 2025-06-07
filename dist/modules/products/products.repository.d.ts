import { Product } from '../../entities/product.entity';
import { Repository } from 'typeorm';
import { ModifyProductDto } from 'src/dtos/modifyProductDto';
import { ProductsDto } from 'src/dtos/productDto';
export declare class ProductsRepository {
    private readonly productsRepository;
    constructor(productsRepository: Repository<Product>);
    getProducts(): Promise<Product[]>;
    preloadProduct(product: Product): Promise<void>;
    getProductById(id: string): Promise<Product>;
    createProduct(product: Partial<ProductsDto>): Promise<Product>;
    updateProduct(id: string, product: ModifyProductDto): Promise<Product>;
    deleteProduct(id: string): Promise<string>;
}
