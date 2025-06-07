import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { createOrderDto } from '../../dtos/createOrderDto';
import { AuthGuard } from 'src/guards/auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth()
@Controller('orders')
@UseGuards(AuthGuard)
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  async createOrder(@Body() createOrderDto: createOrderDto) {
    return this.ordersService.createOrder(createOrderDto);
  }

  @Get(':id')
  async getOrder(@Param('id', ParseUUIDPipe) orderId: string) {
    return this.ordersService.findOrder(orderId);
  }

  @Post('return/:id')
  async returnOrder(@Param('id', ParseUUIDPipe) orderId: string) {
    return this.ordersService.retunrOrder(orderId);
  }
}
