import { CreateUserDto } from './createUserDto';
declare const ModifyUserDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateUserDto>>;
export declare class ModifyUserDto extends ModifyUserDto_base {
    orders?: {
        id: string;
        date: Date;
    }[];
}
export {};
