import { FileUploadService } from './fileUpload.service';
export declare class FileUploadController {
    private readonly fileUploadService;
    constructor(fileUploadService: FileUploadService);
    uploadFile(productId: string, file: Express.Multer.File): Promise<import("../entities/product.entity").Product | null>;
}
