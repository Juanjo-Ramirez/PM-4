"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileUploadModule = void 0;
const common_1 = require("@nestjs/common");
const fileUpload_controller_1 = require("./fileUpload.controller");
const fileUpload_service_1 = require("./fileUpload.service");
const fileUpload_repository_1 = require("./fileUpload.repository");
const typeorm_1 = require("@nestjs/typeorm");
const product_entity_1 = require("../entities/product.entity");
const cloudinary_1 = require("../config/cloudinary");
let FileUploadModule = class FileUploadModule {
};
exports.FileUploadModule = FileUploadModule;
exports.FileUploadModule = FileUploadModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([product_entity_1.Product])],
        controllers: [fileUpload_controller_1.FileUploadController],
        providers: [
            fileUpload_service_1.FileUploadService,
            fileUpload_repository_1.FileUploadRepository,
            cloudinary_1.cloudinaryConfig,
            fileUpload_repository_1.FileUploadRepository,
        ],
    })
], FileUploadModule);
//# sourceMappingURL=fileUpload.module.js.map