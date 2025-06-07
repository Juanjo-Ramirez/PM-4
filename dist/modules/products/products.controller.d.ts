import { ProductsService } from './products.service';
import { ProductsDto } from 'src/dtos/productDto';
import { ModifyProductDto } from 'src/dtos/modifyProductDto';
export declare class ProductsController {
    private readonly productsService;
    constructor(productsService: ProductsService);
    getProducts(): Promise<import("../../entities/product.entity").Product[]>;
    getProductById(id: string): Promise<import("../../entities/product.entity").Product>;
    createProduct(product: ProductsDto): Promise<import("../../entities/product.entity").Product>;
    updateProduct(id: string, product: ModifyProductDto): Promise<import("../../entities/product.entity").Product>;
    seedProducts(): Promise<{
        message: string;
    }>;
}
