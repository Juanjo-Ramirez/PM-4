import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  ParseUUIDPipe,
  UseGuards,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsDto } from 'src/dtos/productDto';
import { AuthGuard } from 'src/guards/auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { ModifyProductDto } from 'src/dtos/modifyProductDto';

@ApiBearerAuth()
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  getProducts() {
    return this.productsService.getProducts();
  }

  @Get(':id')
  getProductById(@Param('id', ParseUUIDPipe) id: string) {
    return this.productsService.getProductById(id);
  }

  @Post('/create')
  @UseGuards(AuthGuard)
  createProduct(@Body() product: ProductsDto) {
    return this.productsService.createProduct(product);
  }

  @Put('/update/:id')
  @UseGuards(AuthGuard)
  updateProduct(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() product: ModifyProductDto,
  ) {
    return this.productsService.updateProduct(id, product);
  }

  @Post('seeder')
  async seedProducts() {
    return this.productsService.productsSeeder();
  }
}
