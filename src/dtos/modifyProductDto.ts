import { PartialType } from '@nestjs/mapped-types';
import { ProductsDto } from './productDto';

export class ModifyProductDto extends PartialType(ProductsDto) {}
