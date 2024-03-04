import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { BasketsService } from './baskets.service';
import { CreateBasketDto } from './dto/create-basket.dto';
import { UpdateBasketDto } from './dto/update-basket.dto';

@Controller('baskets/me')
export class BasketsController {
  constructor(private readonly basketsService: BasketsService) {}

  @Get()
  async getBasket() {
    const items = await this.basketsService.getBasketItems();
    return { items };
  }

  @Put(':id')
  async addItem(@Param('id') id: string) {
    const itemCount = await this.basketsService.addItem(id);
    return { itemCount };
  }

  @Delete()
  @HttpCode(HttpStatus.NO_CONTENT)
  async clearBasket() {
    await this.basketsService.clearBasket();
  }

  @Post()
  create(@Body() createBasketDto: CreateBasketDto) {
    return this.basketsService.create(createBasketDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.basketsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBasketDto: UpdateBasketDto) {
    return this.basketsService.update(+id, updateBasketDto);
  }
}
