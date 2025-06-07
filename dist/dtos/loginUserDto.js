"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginUserDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const createUserDto_1 = require("../dtos/createUserDto");
class LoginUserDto extends (0, swagger_1.PickType)(createUserDto_1.CreateUserDto, [
    'email',
    'password',
]) {
}
exports.LoginUserDto = LoginUserDto;
//# sourceMappingURL=loginUserDto.js.map