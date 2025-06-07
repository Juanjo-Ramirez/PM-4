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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsService = void 0;
const common_1 = require("@nestjs/common");
const products_repository_1 = require("./products.repository");
const categories_repository_1 = require("../categories/categories.repository");
const Archivo_actividad_3_json_1 = __importDefault(require("../../Archivo actividad 3.json"));
let ProductsService = class ProductsService {
    productsRepository;
    categoriesRepository;
    constructor(productsRepository, categoriesRepository) {
        this.productsRepository = productsRepository;
        this.categoriesRepository = categoriesRepository;
    }
    getProducts() {
        return this.productsRepository.getProducts();
    }
    getProductById(id) {
        const product = this.productsRepository.getProductById(id);
        return product;
    }
    createProduct(product) {
        return this.productsRepository.createProduct(product);
    }
    updateProduct(id, product) {
        return this.productsRepository.updateProduct(id, product);
    }
    async productsSeeder() {
        const categories = await this.categoriesRepository.getCategories();
        const categoryMap = new Map();
        categories.forEach((category) => {
            categoryMap.set(category.name, category);
        });
        for (const item of Archivo_actividad_3_json_1.default) {
            const category = categoryMap.get(item.category);
            if (!category) {
                throw new Error(`Category ${item.category} not found`);
            }
            await this.productsRepository.createProduct({
                name: item.name,
                description: item.description,
                price: item.price,
                stock: item.stock,
                categories: category,
            });
        }
        return { message: 'Products seeded successfully' };
    }
};
exports.ProductsService = ProductsService;
exports.ProductsService = ProductsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [products_repository_1.ProductsRepository,
        categories_repository_1.CategoriesRepository])
], ProductsService);
//# sourceMappingURL=products.service.js.map