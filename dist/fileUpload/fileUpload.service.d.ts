import { Product } from 'src/entities/product.entity';
import { FileUploadRepository } from './fileUpload.repository';
import { Repository } from 'typeorm';
export declare class FileUploadService {
    private readonly fileUploadRepository;
    private readonly productsRepository;
    constructor(fileUploadRepository: FileUploadRepository, productsRepository: Repository<Product>);
    uploadImage(file: Express.Multer.File, productId: string): Promise<Product | null>;
}
