import {
  Controller,
  Get,
  Post,
  Body /*, Patch, Param, Delete*/,
  Req,
  Inject,
  forwardRef,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthService } from '../auth/auth.service';
import { User } from 'src/decorator/curent-user.decorator';
import { UserDocument } from 'src/schemas/users.schema';
import { NoAuth } from 'src/decorator/public-access.decorator';

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
      age: user.age
    }
    
  }
  /*
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }*/
}
