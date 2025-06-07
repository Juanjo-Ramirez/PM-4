"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModifyUserDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const createUserDto_1 = require("./createUserDto");
class ModifyUserDto extends (0, mapped_types_1.PartialType)(createUserDto_1.CreateUserDto) {
    orders;
}
exports.ModifyUserDto = ModifyUserDto;
//# sourceMappingURL=modifyUserDto.js.map