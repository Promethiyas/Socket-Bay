import { Injectable } from '@nestjs/common';
import { CreateBasketDto } from './dto/create-basket.dto';
import { UpdateBasketDto } from './dto/update-basket.dto';
import { InjectRedis } from '@nestjs-modules/ioredis';
import Redis from 'ioredis';

@Injectable()
export class BasketsService {
  constructor(@InjectRedis() private readonly redis: Redis) {}

  async getBasketItems(): Promise<string[]> {
    const items = await this.redis.lrange('basket:items', 0, -1);
    return items;
  }

  async addItem(id: string): Promise<number> {
    await this.redis.rpush('basket:items', id);
    const itemCount = await this.redis.llen('basket:items');
    return itemCount;
  }

  async clearBasket(): Promise<void> {
    await this.redis.del('basket:items');
  }

  create(createBasketDto: CreateBasketDto) {
    return 'This action adds a new basket';
  }

  findAll() {
    return `This action returns all baskets`;
  }

  findOne(id: number) {
    return `This action returns a #${id} basket`;
  }

  update(id: number, updateBasketDto: UpdateBasketDto) {
    return `This action updates a #${id} basket`;
  }

  remove(id: number) {
    return `This action removes a #${id} basket`;
  }
}
