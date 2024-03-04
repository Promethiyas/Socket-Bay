import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BasketsModule } from './baskets/baskets.module';

@Module({
  imports: [BasketsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
