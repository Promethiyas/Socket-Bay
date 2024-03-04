import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BasketsModule } from './baskets/baskets.module';
import { RedisModule } from './redis/redis.module';

@Module({
  imports: [BasketsModule, RedisModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
