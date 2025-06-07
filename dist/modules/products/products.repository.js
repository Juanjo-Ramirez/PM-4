"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const product_entity_1 = require("../../entities/product.entity");
const typeorm_2 = require("typeorm");
let ProductsRepository = class ProductsRepository {
    productsRepository;
    constructor(productsRepository) {
        this.productsRepository = productsRepository;
    }
    async getProducts() {
        return await this.productsRepository.find({ relations: ['categories'] });
    }
    async preloadProduct(product) {
        const existingProduct = await this.productsRepository.findOne({
            where: { name: product.name },
        });
        if (!existingProduct) {
            await this.productsRepository.save({
                ...product,
            });
        }
    }
    async getProductById(id) {
        const product = await this.productsRepository.findOne({
            where: { id },
            relations: ['categories'],
        });
        if (!product) {
            throw new common_1.NotFoundException(`Product with ID ${id} not found`);
        }
        return product;
    }
    async createProduct(product) {
        const existingProduct = await this.productsRepository.findOne({
            where: { name: product.name },
        });
        if (existingProduct) {
            throw new common_1.NotFoundException(`Product with name ${product.name} already exists`);
        }
        const newProduct = this.productsRepository.create({
            ...product,
            categories: product.categories ? product.categories : null,
        });
        return await this.productsRepository.save(newProduct);
    }
    async updateProduct(id, product) {
        const productToUpdate = await this.productsRepository.findOne({
            where: { id },
        });
        if (!productToUpdate) {
            throw new common_1.NotFoundException(`Product with ID ${id} not found`);
        }
        Object.assign(productToUpdate, product);
        await this.productsRepository.save(productToUpdate);
        return productToUpdate;
    }
    async deleteProduct(id) {
        const product = await this.productsRepository.findOne({
            where: { id },
        });
        if (!product) {
            throw new common_1.NotFoundException(`Product with ID ${id} not found`);
        }
        await this.productsRepository.remove(product);
        return `Product with ID ${id} deleted successfully`;
    }
};
exports.ProductsRepository = ProductsRepository;
exports.ProductsRepository = ProductsRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(product_entity_1.Product)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ProductsRepository);
//# sourceMappingURL=products.repository.js.map