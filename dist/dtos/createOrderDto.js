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
Object.defineProperty(exports, "__esModule", { value: true });
exports.createOrderDto = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const swagger_1 = require("@nestjs/swagger");
class ProductDto {
    id;
}
__decorate([
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], ProductDto.prototype, "id", void 0);
class createOrderDto {
    userId;
    products;
}
exports.createOrderDto = createOrderDto;
__decorate([
    (0, class_validator_1.IsUUID)(),
    (0, swagger_1.ApiProperty)({
        description: 'User ID',
        example: '550e8400-e29b-41d4-a716-446655440000',
        type: String,
    }),
    __metadata("design:type", String)
], createOrderDto.prototype, "userId", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ArrayNotEmpty)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => ProductDto),
    (0, swagger_1.ApiProperty)({
        description: 'List of products in the order',
        type: [ProductDto],
        example: [
            { id: '550e8400-e29b-41d4-a716-446655440000' },
            { id: '550e8400-e29b-41d4-a716-446655441111' },
        ],
    }),
    __metadata("design:type", Array)
], createOrderDto.prototype, "products", void 0);
//# sourceMappingURL=createOrderDto.js.map