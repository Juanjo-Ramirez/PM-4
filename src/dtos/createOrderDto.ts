import {
  IsUUID,
  IsArray,
  ValidateNested,
  ArrayNotEmpty,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

class ProductDto {
  @IsUUID()
  id: string;
}

export class createOrderDto {
  @IsUUID()
  @ApiProperty({
    description: 'User ID',
    example: '550e8400-e29b-41d4-a716-446655440000',
    type: String,
  })
  userId: string;

  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => ProductDto)
  @ApiProperty({
    description: 'List of products in the order',
    type: [ProductDto],
    example: [
      { id: '550e8400-e29b-41d4-a716-446655440000' },
      { id: '550e8400-e29b-41d4-a716-446655441111' },
    ],
  })
  products: ProductDto[];
}
