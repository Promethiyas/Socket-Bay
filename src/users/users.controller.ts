import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  forwardRef,
} from '@nestjs/common';
import { User } from 'src/decorator/curent-user.decorator';
import { NoAuth } from 'src/decorator/public-access.decorator';
import { UserDocument, UserWallet } from 'src/schemas/users.schema';
import { AuthService } from '../auth/auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateWalletDto } from './dto/update-wallet.dto';
import { UsersService } from './users.service';

@Controller('/')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
  ) {}

  @NoAuth()
  @Post('/auth/register')
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.create(createUserDto);
  }

  @NoAuth()
  @Post('/auth/login')
  async login(@Body() signInDto: Record<string, any>) {
    return await this.authService.signIn(signInDto.email, signInDto.password);
  }

  @Get('/user/me')
  async getMe(@User() user: UserDocument) {
    return {
      id: user.id,
      username: user.username,
      email: user.email,
      phone: user.phone,
      address: user.address,
      age: user.age,
    };
  }

  @Post('/user/wallet')
  public async postWallet(
    @Body() dto: UpdateWalletDto,
    @User() user: UserDocument,
  ): Promise<UserWallet> {
    return this.usersService.updateWallet(user, dto);
  }
}
