"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModifyProductDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const productDto_1 = require("./productDto");
class ModifyProductDto extends (0, mapped_types_1.PartialType)(productDto_1.ProductsDto) {
}
exports.ModifyProductDto = ModifyProductDto;
//# sourceMappingURL=modifyProductDto.js.map