import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { User } from 'src/decorator/curent-user.decorator';
import { UserDocument } from 'src/schemas/users.schema';
import { UpdateWalletDto } from './dto/update-wallet.dto';

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

  @Post('/balanceMas')
  async changeBalanceMas(@Body() updateWalletDto: UpdateWalletDto,@User() user:UserDocument){
     return await this.walletService.updateWalletMas(updateWalletDto, user);
  }

  @Post('/balanceMenos')
  async changeBalanceMenos(@Body() updateWalletDto: UpdateWalletDto,@User() user:UserDocument){
     return await this.walletService.updateWalletMenos(updateWalletDto, user);
  }

}
