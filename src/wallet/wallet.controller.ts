import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { User } from 'src/decorator/curent-user.decorator';
import { UserDocument } from 'src/schemas/users.schema';

@Controller('wallet')
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @Post()
  create(@Body() createWalletDto: CreateWalletDto,@User() user:UserDocument) {
    return this.walletService.create(createWalletDto,user);
  }
  @Get()
  async findOneByID(@User() user:UserDocument) {
    return await this.walletService.findOneByID(user.wallet);
  }

  // @Post('/balance')
  // async changeBalance(@User() user:UserDocument){
  //   user.wallet +=
  // }

}
