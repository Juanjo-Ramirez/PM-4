import { Type } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ProductsDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Name of the product',
    example: 'Wireless Headphones',
    type: String,
  })
  name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Detailed description of the product',
    example:
      'High-quality wireless headphones with noise cancellation technology',
    type: String,
  })
  description: string;

  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Price of the product in USD',
    example: 99.99,
    type: Number,
  })
  price: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Available quantity in stock',
    example: 50,
    type: Number,
  })
  stock: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'URL of the product image',
    example: 'https://example.com/images/headphones.jpg',
    type: String,
  })
  imgUrl: string;

  @IsArray()
  @IsOptional()
  categories?: any;
}
