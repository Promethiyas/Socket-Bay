import { Module } from '@nestjs/common';
import { RedisService } from './redis.service';
import { RedisController } from './redis.controller';
import { RedisModule } from '@nestjs-modules/ioredis';

@Module({
  controllers: [RedisController],
  providers: [RedisService],
  imports: [
    RedisModule.forRoot({
      type: 'single',
      url: 'redis://localhost:6379',
    }),
  ],
})
export class RedisAppModule {}
